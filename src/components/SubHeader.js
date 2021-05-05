import React from "react";
import { Link } from "react-router-dom";

export const SubHeader = () => {
  return (
    <nav className="navbar navbar-light bg-white justify-content-between">
      <Link className="navbar-brand" to={"/projects"}>
        My Projects
      </Link>
      <Link to={"/add"}>
        <button className="btn btn-danger my-2 my-sm-0">+ Add Project</button>
      </Link>
    </nav>
  );
};
