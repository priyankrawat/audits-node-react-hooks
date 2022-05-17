import React, { useState } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

function ProjectAdd({ refreshTable }) {
  const initialProjectState = { title: '', content: '' };
  const [project, setProject] = useState(initialProjectState);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProject(prevProject => ({
      ...prevProject,
      [id]: value
    }));
  };

  const updateAction = (projectToEdit) => {
    if (projectToEdit) {
      setProject(projectToEdit);
      setEditMode(true);
    } else {
      setProject(initialProjectState);
      setEditMode(false);
    }
  };

  const handleAddProject = (event) => {
    event.preventDefault();
    if (!project) return;

    const apiCall = editMode
      ? API.put(`/api/projects/${project.id}`, project)
      : API.post('api/projects', project);

    apiCall
      .then((res) => {
        refreshTable();
        console.log(res);
        // Reset the form after successful submission
        updateAction(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card text-left mb-3">
      <div className="card-body">
        <form onSubmit={handleAddProject}>
          <div className="form-group">
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={project.title}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              placeholder="content"
              onChange={handleChange}
              value={project.content}
            />
          </div>

          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Edit' : 'Add'}
            </button>
            {editMode && (
              <button type="button" className="btn btn-warning" onClick={() => updateAction()}>
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

ProjectAdd.propTypes = {
  refreshTable: PropTypes.func.isRequired
};

export default ProjectAdd;
