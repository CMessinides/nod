import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ClientOnly({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return isMounted ? children : null;
}

ClientOnly.propTypes = {
  children: PropTypes.node.isRequired
};
