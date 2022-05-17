import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

const ProjectTable = ({ sendToEdit }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('');

  const handleEditProject = (event, id) => {
    event.preventDefault();
    sendToEdit(projects.find((p) => p.id === id));
  };

  const handleRemoveProject = (event, id) => {
    event.preventDefault();
    API.delete(`/api/projects/${id}`)
      .then(() => {
        fetchProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const targetValue = event.target.value;
    setFilter(targetValue);
    if (targetValue) getByID(targetValue);
    else fetchProjects();
  };

  const getByID = (filterValue) => {
    console.log(filterValue);
    API.get(`/api/projects/${filterValue}`)
      .then((res) => {
        if (res.data) setProjects([res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProjects = () => {
    API.get('/api/projects')
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      fetchProjects();
    }
  }, []); // ComponentDidMount equivalent

  const listItems = projects.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.title}</td>
      <td>{item.owner}</td>
      <td>{item.description}</td>
      <td>
        <div className="btn-group" role="group" aria-label="">
          <button
            type="button"
            className="btn btn-warning"
            onClick={(e) => handleEditProject(e, item.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleRemoveProject(e, item.id)}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="card">
      <div className="card-body">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Filter
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="ID"
            aria-label="ID"
            value={filter}
            onChange={handleChange}
          />
        </div>

        <table className="table table-hover table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Owner</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    </div>
  );
};

ProjectTable.propTypes = {
  sendToEdit: PropTypes.func.isRequired,
};

export default ProjectTable;
