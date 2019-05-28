import React from "react";
import Link from "../components/Link";
import { routes } from "../routes";

export default function Home() {
  return (
    <div>
      Hello world (from Next)!
      <Link
        page="/notebook"
        pattern={routes.notebook}
        params={{ id: "my-notebook" }}
      >
        Go to my notebook
      </Link>
    </div>
  );
}
