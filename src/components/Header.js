import React from "react";
import logo from "../logo.png";

export const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white">
      <a className="navbar-brand" href="">
        <img src={logo} width="40" height="32" alt="agency logo" />
      </a>
    </nav>
  );
};
