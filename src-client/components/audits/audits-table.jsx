import React, { useState, useEffect } from 'react';
import API from '../../api/api';

function AuditTable() {
  const [audits, setAudits] = useState([]);

  const fetchAudits = () => {
    API.get('/api/audits')
      .then((res) => {
        setAudits(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      fetchAudits();
    }
  }, []); // The empty dependency array ensures this runs only once on mount

  const listItems = audits.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.event}</td>
      <td>{item.status}</td>
      <td>{item.message}</td>
      <td>{item.user_id}</td>
      <td>{item.created_at}</td>
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
        </div>
        <table className="table table-hover table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">event</th>
              <th scope="col">status</th>
              <th scope="col">message</th>
              <th scope="col">user</th>
              <th scope="col">created at</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditTable;