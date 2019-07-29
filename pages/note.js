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

function Note({ note, error }) {
  return (
    <CanError error={error}>
      {() => (
        <div>
          <h1>{note.title}</h1>
          <dl>
            <dt>Notebook</dt>
            <dd>
              <Link
                page="/notebook"
                pattern={routes.notebook}
                params={pick(note.notebook, ["id", "slug"])}
              >
                {note.notebook.title}
              </Link>
            </dd>
            <dt>Last Modified At</dt>
            <dd>
              <ClientOnly>
                {new Date(note.modifiedAt).toLocaleString()}
              </ClientOnly>
            </dd>
          </dl>
        </div>
      )}
    </CanError>
  );
}

Note.getInitialProps = async function({ query, req, res }) {
  let { data, error } = await ApiClient.request({
    query: `
			query {
				note: noteById(id: ${query.id}) {
					id
					title
					slug
					modifiedAt
					notebook {
						id
						title
						slug
					}
				}
			}
		`,
    res
  });

  if (data && data.note) {
    replaceOrRedirect({
      route: routes.note,
      params: pick(data.note, ["id", "slug"]),
      req,
      res,
      router: Router
    });
  }

  return { ...data, error };
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    modifiedAt: PropTypes.number.isRequired,
    notebook: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  }),
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  })
};

export default Note;
