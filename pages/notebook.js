import React from "react";
import PropTypes from "prop-types";

function Notebook({ id }) {
  return <h1>Notebook {id}</h1>;
}

Notebook.getInitialProps = async function({ query }) {
  return {
    id: query.id
  };
};

Notebook.propTypes = {
  id: PropTypes.string
};

export default Notebook;
