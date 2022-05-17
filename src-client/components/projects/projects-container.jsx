import React, { useRef } from 'react';

import ProjectAdd from './projects-add';
import ProjectTable from './projects-table';

const ProjectContainer = () => {
  const projectAddForm = useRef();
  const projectTable = useRef();

  const sendToEdit = (project) => {
    projectAddForm.current.updateAction(project);
  };

  const refreshTable = (project) => {
    projectTable.current.fetchProjects(project);
  };

  return (
    <div className="col">
      <ProjectAdd ref={projectAddForm} refreshTable={refreshTable} />
      <ProjectTable sendToEdit={sendToEdit} ref={projectTable} />
    </div>
  );
};

export default ProjectContainer;
