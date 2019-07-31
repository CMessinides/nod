import React from "react";
import Error from "next/error";
import { ClientError } from "../lib/types";

const CanError: React.FC<CanErrorProps> = ({ error, children }) => {
	return error ? <Error statusCode={error.status || 500} /> : children();
};

interface CanErrorProps {
	error?: ClientError;
	children(): JSX.Element;
}

export default CanError;
