import React from "react";
import PropTypes from "prop-types";
import ApiClient from "../client";

function Notebook({ notebook, error }) {
  if (error)
    return (
      <div>
        Error: {error.name} - {error.message}
      </div>
    );

  if (notebook === null) return <div>Error: No notebook found.</div>;

  return (
    <div>
      <h1>{notebook.title}</h1>
      {notebook.description && <p>{notebook.description}</p>}
      <time>{new Date(notebook.created_at).toLocaleDateString()}</time>
    </div>
  );
}

Notebook.getInitialProps = async function({ query }) {
  const { data, error } = await ApiClient.query(`
    query {
      notebook: notebookById(id: ${query.id}) {
        title
        description
        createdAt
      }
    }
  `);
  return { ...data, error };
};

Notebook.propTypes = {
  notebook: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.number
  }),
  error: PropTypes.object
};

export default Notebook;
