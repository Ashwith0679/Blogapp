import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axioswithtoken from './Axios'; 

function Article() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentdata } = useSelector(state => state.userAuthor);
  const { state } = useLocation();

  async function handleForSubmit(obj) {
    obj.username = currentdata?.user?.username;
    obj.articleId = state?.articleId;
    console.log(obj)
    try {
      await axioswithtoken.post(`http://localhost:4000/user-api/comments`, obj);
    } catch (error) {
      console.error("Error posting comment:", error.response?.data || error.message);
    }
  }

  return (
    <div>
      <h5>{state?.tittle}</h5>
      <span>
        <small>Created on: {state?.dateOfCreation}</small>
        <small>Modified on: {state?.dateOfModification}</small>
      </span>

      {currentdata.user.userType === 'author' && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}

      <p>{state?.content}</p>

      {currentdata?.user?.userType === 'user' && (
        <form onSubmit={handleSubmit(handleForSubmit)}>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            placeholder="Comment on the blog"
            {...register('comment', { required: 'Comment is required' })}
          />
          {errors.comment && <p className="error-message">{errors.comment.message}</p>}
          <button type="submit">Post</button>
        </form>
      )}
    </div>
  );
}

export default Article;
