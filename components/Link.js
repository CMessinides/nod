import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { createClientRoute, createServerRoute } from "../routes";

function Link({ page, pattern, params = {}, children, ...props } = {}) {
  return (
    <NextLink
      href={createClientRoute(page, params)}
      as={createServerRoute(pattern || page, params)}
      {...props}
    >
      <a>{children}</a>
    </NextLink>
  );
}

Link.propTypes = {
  page: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  params: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default Link;
