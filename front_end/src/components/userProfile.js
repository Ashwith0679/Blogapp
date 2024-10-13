import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function userProfile() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/userProfile/Articles">articles</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default userProfile