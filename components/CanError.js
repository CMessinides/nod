import React from "react";
import PropTypes from "prop-types";
import Error from "next/error";

function CanError({ error, children }) {
  return error ? <Error statusCode={error.status || 500} /> : children();
}

CanError.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number
  }),
  children: PropTypes.func.isRequired
};

export default CanError;
