import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

const PostAdd = ({ refreshTable, postToEdit }) => {
  const [post, setPost] = useState({ title: '', content: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setPost(postToEdit);
      setEditMode(true);
    } else {
      setPost({ title: '', content: '' });
      setEditMode(false);
    }
  }, [postToEdit]);

  const handleAddPost = (event) => {
    event.preventDefault();
    if (!post) return;

    const request = editMode
      ? API.put(`/api/posts/${post.id}`, post)
      : API.post('api/posts', post);

    request
      .then((res) => {
        refreshTable();
        console.log(res);
        handleCancelEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPost((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancelEdit = () => {
    setPost({ title: '', content: '' });
    setEditMode(false);
  };

  return (
    <div className="card text-left mb-3">
      <div className="card-body">
        <form onSubmit={handleAddPost}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={post.title}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              placeholder="Content"
              onChange={handleChange}
              value={post.content}
            />
          </div>

          <div className="btn-group" role="group">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Edit' : 'Add'}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleCancelEdit}
              >
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
  postToEdit: PropTypes.object, // You can refine this with shape if needed
};

PostAdd.defaultProps = {
  postToEdit: null,
};

export default PostAdd;
