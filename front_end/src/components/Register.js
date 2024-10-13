import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Register.css'; // Import the CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
  const [err,setErr]=useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()

  async function handleForSubmit(userObj) {
    //make an http request
    if(userObj.userType==='user'){
  let result= await axios.post('http://localhost:4000/user-api/Register',userObj)
  if (result.data.message === 'user registered') {
    console.log('Navigating to /Login');
    navigate('/Login');
  } else {
    setErr(result.data.message);
  }
    }
    else{
      let result= await axios.post('http://localhost:4000/author-api/Register',userObj)
      if (result.data.message === 'author registered') {
        console.log('Navigating to /Login');
        navigate('/Login');
      } else {
        setErr(result.data.message);
      }
    }
  
  
}

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(handleForSubmit)}>
          <div className="form-group">
            <label>User Type</label>
            <div className="radio-group">
              <div>
                <input
                  type="radio"
                  id="user"
                  value="user"
                  {...register('userType', { required: 'User Type is required' })}
                />
                <label htmlFor="user">User</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="author"
                  value="author"
                  {...register('userType', { required: 'User Type is required' })}
                />
                <label htmlFor="author">Author</label>
              </div>
            </div>
            {errors.userType && <p className="error-message">{errors.userType.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
