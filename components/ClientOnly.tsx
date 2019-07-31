import React from "react";

const ClientOnly: React.FC = ({ children }) => {
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, [setIsMounted]);

	return isMounted ? <>{children}</> : null;
};

export default ClientOnly;
