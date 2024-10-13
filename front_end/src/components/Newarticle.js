import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axioswithtoken from './Axios'; // Importing axios instance

function Newarticle() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentdata } = useSelector(state => state.userAuthor);
  const navigate = useNavigate();

  async function dynamicData(blogData) {
    blogData.dateOfCreation = new Date();
    blogData.dateOfModification = new Date();
    blogData.articleId = Date.now();
    blogData.comments = [];
    blogData.username = currentdata?.user?.username || '';

    try {
      const res = await axioswithtoken.post('http://localhost:4000/author-api/articles', blogData);
      if (res.data.message === 'New article created') {
        navigate(`/AuthorProfile/Newarticle`);
      }
    } catch (error) {
      console.error('Error creating article:', error.response?.data || error.message);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Blog</h2>
        <form onSubmit={handleSubmit(dynamicData)}>
          <label htmlFor="Tittle">Title</label>
          <input
            type="text"
            id="articlename"
            {...register('tittle', { required: 'Title is required' })}
          />
          {errors.tittle && <p>{errors.tittle.message}</p>}

          <label htmlFor="category">Category</label>
          <input
            type="checkbox"
            value="programming"
            {...register('category', { required: 'At least one category is required' })}
          />
          {errors.category && <p>{errors.category.message}</p>}

          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            rows="20"
            {...register('content', { required: 'Blog content is required' })}
          />
          {errors.content && <p>{errors.content.message}</p>}

          <button type="submit">Submit Blog</button>
        </form>
      </div>
    </div>
  );
}

export default Newarticle;
