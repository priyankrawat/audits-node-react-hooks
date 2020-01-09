import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

const PostTable = ({ sendToEdit }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      fetchPosts();
    }
  }, []);

  const fetchPosts = () => {
    API.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getByID = () => {
    if (!filter) return;
    API.get(`/api/posts/${filter}`)
      .then((res) => {
        if (res.data) setPosts([res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (value) {
      getByID();
    } else {
      fetchPosts();
    }
  };

  const handleEditPost = (event, id) => {
    event.preventDefault();
    const post = posts.find((p) => p.id === id);
    sendToEdit(post);
  };

  const handleRemovePost = (event, id) => {
    event.preventDefault();
    API.delete(`/api/posts/${id}`)
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="input-group mb-3">
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
              <th scope="col">Author</th>
              <th scope="col">Content</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.content}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) => handleEditPost(e, item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => handleRemovePost(e, item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PostTable.propTypes = {
  sendToEdit: PropTypes.func.isRequired,
};

export default PostTable;
