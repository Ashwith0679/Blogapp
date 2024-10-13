import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Rootlayout from './components/Rootlayout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/userProfile';
import AuthorProfile from './components/authorProfile';
import Newarticle from './components/Newarticle';
import Articles from './components/Articles';
import Article from './components/Article';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Rootlayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/Login',
          element: <Login />
        },
        {
          path: '/Register',
          element: <Register />
        },
        {
          path: '/userProfile',
          element: <UserProfile />,
          children: [
            {
              path: 'Articles', // Added the path for articles under user profile
              element: <Articles />
            },
            {
              path: 'Article/:articleId', // Correct route for viewing an article
              element: <Article />
            }
          ]
        },
        {
          path: '/AuthorProfile',
          element: <AuthorProfile />,
          children: [
            {
              path: 'Newarticle/:author',
              element: <Newarticle />
            },
            {
              path: 'Newarticle',
              element: <Newarticle />
            },
            {
              path: 'Articles', // Articles path for author
              element: <Articles />
            },
            {
              path: 'Article/:articleId', // Correct route for viewing an article
              element: <Article />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
