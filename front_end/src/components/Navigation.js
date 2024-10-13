import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'
import { useSelector } from 'react-redux'
import { resetState } from '../redux/Slices/userAuthorSlice'
import { useDispatch } from 'react-redux'

function Navigation() {
  const {userlogin} =useSelector(state=>state.userAuthor)
  const dispatch=useDispatch()
  function Logout(){
    //remove token from storage
    localStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    
    <ul className='nav'>
      {userlogin===false?<>
      <li className='nav-item '>
        <Link className='nav-link' to='/'>Home</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>Register</Link>
      </li></>:
       <li className='nav-item'>
        <Link className='nav-link' to='/login' onClick={Logout}>Logout</Link>
      </li>}
      
     
    </ul>
    
  )
}

export default Navigation
