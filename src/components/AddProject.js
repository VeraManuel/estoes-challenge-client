import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectDataService from "../services/ProjectService";
import UserDataService from "../services/UserService";

const AddProject = (props) => {
  const initialProjectState = {
    id: null,
    name: "",
    description: "",
    project_manager: "",
    userId: undefined,
    status: undefined,
  };
  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState([]);

  const routeChange = () => {
    let path = `/projects`;
    props.history.push(path);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    UserDataService.getAll()
      .then((response) => {
        let users = response.data.data;
        setUser(users);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const saveProject = () => {
    var data = {
      name: project.name,
      description: project.description,
      project_manager: project.project_manager,
      userId: project.userId,
      status: project.status,
    };

    ProjectDataService.create(data)
      .then((response) => {
        setProject({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          project_manager: response.data.project_manager,
          userId: response.data.userId,
          status: response.data.status,
        });
        setSubmitted(true);
        routeChange();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="project-form container col-md-8 bg-white m-auto">
      {submitted ? (
        <Redirect to={"/"} />
      ) : (
        <div id="form-container" className="container mt-5">
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={project.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={project.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="project_manager">Project Manager</label>
            <select
              className="form-control"
              id="project_manager"
              required
              value={project.project_manager}
              onChange={handleInputChange}
              name="project_manager"
            >
              <option hidden selected>
                Select a person
              </option>
              {user.map((element) => {
                return (
                  <option
                    key={element.id}
                    value={element.firstName + " " + element.lastName}
                  >
                    {element.firstName + " " + element.lastName}
                  </option>
                );
              })}
              ;
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="userId">Assgined To</label>
            <select
              className="form-control"
              id="userId"
              required
              value={project.userId}
              onChange={handleInputChange}
              name="userId"
            >
              <option hidden selected>
                Select a person
              </option>
              {user.map((element) => {
                return (
                  <option key={element.id} value={element.id}>
                    {element.firstName + " " + element.lastName}
                  </option>
                );
              })}
              ;
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              required
              value={project.status}
              onChange={handleInputChange}
              name="status"
            >
              <option hidden selected>
                Select status
              </option>
              <option value={true}>Enable</option>
              <option value={false}>Disable</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={saveProject}
            className="btn btn-danger "
          >
            Create project
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProject;
