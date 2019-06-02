import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ApiClient from "../client";
import routes from "../config/routes.config";
import { createServerRoute } from "../lib/routes";
import ClientOnly from "../components/ClientOnly";

function Notebook({ notebook, error }) {
  useEffect(() => {
    if (notebook) {
      const path = createServerRoute(routes.notebook, {
        id: notebook.id,
        slug: notebook.slug
      });
      if (window.location.pathname !== path) {
        window.history.replaceState({}, notebook.title, path);
      }
    }
  }, [notebook]);

  if (error)
    return (
      <div>
        Error: {error.name} - {error.message}
        <pre>{JSON.stringify(error, 2)}</pre>
      </div>
    );

  if (notebook === null) return <div>Error: No notebook found.</div>;

  return (
    <div>
      <h1>{notebook.title}</h1>
      {notebook.description && <p>{notebook.description}</p>}
      <time>
        <ClientOnly>
          {new Date(notebook.createdAt).toLocaleDateString()}
        </ClientOnly>
      </time>
    </div>
  );
}

Notebook.getInitialProps = async function({ query }) {
  const { data, error } = await ApiClient.request({
    query: `
      query {
        notebook: notebookById(id: ${query.id}) {
          id
          title
          slug
          description
          createdAt
        }
      }
    `
  });
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
  error: PropTypes.object
};

export default Notebook;
