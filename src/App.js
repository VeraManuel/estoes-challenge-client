import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { Header } from "./components/Header";
import { SubHeader } from "./components/SubHeader";
import AddProject from "./components/AddProject";
import Project from "./components/Project";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SubHeader />

      <Switch>
        <Route exact path={["/", "/projects"]} component={ProjectList} />
        <Route exact path="/add" component={AddProject} />
        <Route path="/projects/:id" component={Project} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
