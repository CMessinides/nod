import React from "react";
import Link from "../components/Link";
import routes from "../config/routes.config";

export default function Home() {
  return (
    <div>
      Hello world (from Next)!
      <Link
        page="/notebook"
        pattern={routes.notebook}
        params={{ slug: "my-notebook", id: 1 }}
      >
        Go to my notebook
      </Link>
    </div>
  );
}
