import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/ProjectService";
import UserDataService from "../services/UserService";

const Project = (props) => {
  const initialProjectState = {
    id: null,
    name: "",
    description: "",
    project_manager: "",
    userId: undefined,
    status: undefined,
  };
  const [project, setProject] = useState(initialProjectState);
  const [user, setUser] = useState([]);

  const routeChange = () => {
    let path = `/projects`;
    props.history.push(path);
  };

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setProject(response.data.data);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProject(props.match.params.id);
    UserDataService.getAll()
      .then((response) => {
        let users = response.data.data;
        setUser(users);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };
  const updateProject = () => {
    ProjectDataService.update(project.id, project)
      .then((response) => {
        console.log(response.data);
        routeChange();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="project-form container col-md-8 bg-white m-auto">
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
          className="btn btn-danger"
          onClick={updateProject}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Project;
