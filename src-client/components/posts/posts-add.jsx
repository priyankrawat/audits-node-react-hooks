import React, { useState } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

const PostAdd = ({ refreshTable }) => {
  const [post, setPost] = useState({ title: '', content: '' });
  const [editMode, setEditMode] = useState(false);

  const updateAction = (postData) => {
    if (postData) {
      setPost(postData);
      setEditMode(true);
    } else {
      setPost({ title: '', content: '' });
      setEditMode(false);
    }
  };

  const handleAddPost = (event) => {
    event.preventDefault();
    if (!post) return;

    const apiCall = editMode
      ? API.put(`/api/posts/${post.id}`, post)
      : API.post('api/posts', post);

    apiCall
      .then((res) => {
        refreshTable();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPost((prevPost) => ({ ...prevPost, [id]: value }));
  };

  return (
    <div className="card text-left mb-3">
      <div className="card-body">
        <form onSubmit={handleAddPost}>
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
              value={post.title}
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
              value={post.content}
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
};

PostAdd.propTypes = {
  refreshTable: PropTypes.func.isRequired,
};

export default PostAdd;
