import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LOgin.css'; 
import {useDispatch} from 'react-redux'
import { userLogin } from '../redux/Slices/userAuthorSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [err, setErr] = useState({});
  const [FormObject,setFormObject]=useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch=useDispatch()
  const {userlogin,errorOcurence,errMsg} = useSelector(state=>state.userAuthor)
  const navigate=useNavigate()

async function handleForSubmit(formSubmit) {
  setFormObject(formSubmit)
  dispatch(userLogin(formSubmit))
  }

  useEffect(()=>{

    //console.log(FormObject)
    if(userlogin===true&&FormObject.userType==='user')
    {
      navigate('/userProfile')
    }
    if(userlogin===true&&FormObject.userType==='author') 
    {
      navigate('/AuthorProfile')
    }
   
  },[userlogin])


  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
