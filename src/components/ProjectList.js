import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ProjectDataService from "../services/ProjectService";
import { confirm, message } from "../Alerts";

const ProjectList = (props) => {
  const [projects, setProjects] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveProjects();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    ProjectDataService.findByName(searchName)
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (id) => {
    confirm(
      "Are you sure you want to delete the project?",
      "This action cannot be undon!",
      (result) => {
        if (result.value) {
          ProjectDataService.remove(id)
            .then(() => {
              setMessage("Project deleted");
              props.history.go(0);
            })
            .then(() => {
              message("Se ha eliminado el testimonio con exito", "", "success");
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    );
  };

  return (
    <>
      <nav className="search navbar navbar-light bg-white justify-content-end">
        <form className="form-inline align-content-end">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={findByName}
            type="button"
          >
            Search
          </button>
        </form>
      </nav>
      <div className="container mt-5">
        <div
          id="project-header"
          class="d-flex flex-row bd-highlight mt-3 bg-light"
        >
          <div className="p-2 bd-highlight align-self-center flex-fill">
            Project Info
          </div>
          <div className="p-2 bd-highlight align-self-center flex-fill">
            Project Manager
          </div>
          <div className="p-2 bd-highlight align-self-center flex-fill">
            Assigned To
          </div>
          <div className="p-2 bd-highlight align-self-center flex-fill">
            Status
          </div>
          <div className="p-2 align-self-center bd-highlight">Action</div>
        </div>
        <div className="container-projects">
          <div
            id="project-list"
            class="d-flex flex-column bd-highlight mb-3 bg-white"
          >
            {projects &&
              projects.map((project) => (
                <div
                  class="d-flex flex-row bd-highlight border-bottom"
                  key={project.id}
                >
                  <div className="p-2 bd-highlight align-self-center flex-fill">
                    {project.name}
                    <div className="date text-muted">
                      Creation date: {""}
                      <Moment format="DD/MM/YYYY hh:mm a">
                        {project.createdAt}
                      </Moment>
                    </div>
                  </div>
                  <div className="p-2 bd-highlight align-self-center flex-fill">
                    <img
                      className="avatar-image rounded-circle"
                      src={`https://ui-avatars.com/api/?name=${project.project_manager}&background=random`}
                      alt="avatar"
                    />
                    {project.project_manager}
                  </div>
                  <div className="p-2 bd-highlight align-self-center flex-fill">
                    <img
                      className="avatar-image rounded-circle"
                      src={project.User.image}
                      alt="avatar"
                    />
                    {project.User.firstName + " " + project.User.lastName}
                  </div>
                  <div className="p-2 bd-highlight align-self-center flex-fill">
                    {project.status ? (
                      <div className="badge badge-light">Enabled</div>
                    ) : (
                      <div className="badge badge-light">Disabled</div>
                    )}
                  </div>
                  <div className="p-2 align-self-center bd-highlight">
                    <div className="dropdown">
                      <i
                        className="bi bi-three-dots-vertical btn-dropdown mr-3"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          to={"/projects/" + project.id}
                          className="bi bi-pencil-square dropdown-item"
                        >
                          Edit
                        </Link>
                        <Link
                          className="bi bi-trash dropdown-item"
                          onClick={() => deleteProject(`${project.id}`)}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
