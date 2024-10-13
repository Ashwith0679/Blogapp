import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function AuthorProfile() {
  const { currentdata } = useSelector((state) => state.userAuthor);

  console.log('currentdata:', currentdata);  // <-- Check if currentdata is correctly populated

  return (
    <div>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to="/AuthorProfile/Articles" className="btn">Articles</Link>
        </li>
        <li className='nav-item'>
          {currentdata && currentdata.user && currentdata.user.username ? (  // Ensure currentdata.user and currentdata.user.username exist
            <Link to={`/AuthorProfile/Newarticle`} className="btn">New Article</Link>
          ) : (
            <p>Loading...</p>  // Show a placeholder while the data is loading or not available
          )}
        </li>
      </ul>
      <Outlet/>
    </div>
  );
}

export default AuthorProfile;
