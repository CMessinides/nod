import React from "react";
import PropTypes from "prop-types";
import ApiClient from "../client";
import routes from "../config/routes.config";
import { replaceOrRedirect } from "../lib/routes";
import { pick } from "../lib/utils";
import ClientOnly from "../components/ClientOnly";
import Router from "next/router";
import CanError from "../components/CanError";
import Link from "../components/Link";

function Notebook({ notebook, error }) {
  return (
    <CanError error={error}>
      {() => (
        <div>
          <h1>{notebook.title}</h1>
          {notebook.description && <p>{notebook.description}</p>}
          <dl>
            <dt>Created At</dt>
            <dd>
              <time>
                <ClientOnly>
                  {new Date(notebook.createdAt).toLocaleDateString()}
                </ClientOnly>
              </time>
            </dd>
          </dl>
          <ul>
            {notebook.notes
              .sort((noteA, noteB) => noteA.modifiedAt - noteB.modifiedAt)
              .map(note => (
                <li key={note.id}>
                  <article>
                    <h2>
                      <Link
                        page="/note"
                        pattern={routes.note}
                        params={pick(note, ["id", "slug"])}
                      >
                        {note.title}
                      </Link>
                    </h2>
                    <dl>
                      <dt>Last Modified At</dt>
                      <dd>
                        <time>
                          <ClientOnly>
                            {new Date(note.modifiedAt).toLocaleString()}
                          </ClientOnly>
                        </time>
                      </dd>
                    </dl>
                  </article>
                </li>
              ))}
          </ul>
        </div>
      )}
    </CanError>
  );
}

Notebook.getInitialProps = async function({ query, req, res }) {
  let { data, error } = await ApiClient.request({
    query: `
      query {
        notebook: notebookById(id: ${query.id}) {
          id
          title
          slug
          description
          createdAt
          notes {
            id
            title
            slug
            modifiedAt
          }
        }
      }
    `,
    res
  });

  if (data && data.notebook) {
    replaceOrRedirect({
      route: routes.notebook,
      params: pick(data.notebook, ["id", "slug"]),
      req,
      res,
      router: Router
    });
  }

  return { ...data, error };
};

Notebook.propTypes = {
  notebook: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.number
  }),
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  })
};

export default Notebook;
