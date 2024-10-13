import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Articles.css';
import { useNavigate } from 'react-router-dom';
import axioswithtoken from './Axios';

function Articles() {

  const [articleslist, setarticleslist] = useState([]);
  const { currentdata } = useSelector(state => state.userAuthor);
  const navigate = useNavigate();

  



  async function articlesOfAuthor() {
    try {
      let res;
      if (currentdata.user.userType === 'author') {
        res = await axioswithtoken.get(`http://localhost:4000/author-api/articles/${currentdata.user.username}`);
      } else {
        res = await axioswithtoken.get(`http://localhost:4000/user-api/articles`);
        console.log('working')
      }
      console.log(res.data.payload)
      setarticleslist(res.data.payload); 
    } catch (error) {
      
      console.error("Error fetching articles:", error);
      setarticleslist([]); 
    }
  }

  function readmore(article) {
    navigate(`../Article/${article.articleId}`, { state: article });
  }

  useEffect(() => {
    articlesOfAuthor();
  }, []);

  return (
    <div className="articles-container">
      {articleslist?.length > 0 ? ( // Safely check articleslist length
        articleslist.map((article, index) => (
          <div key={index} className="article-card">
            <h5 className="article-title">{article.tittle}</h5>
            <p className="article-content">{article.content.substring(0, 90) + '....'}</p>
            <button className="article-button" onClick={() => readmore(article)}><span>Read more</span></button>
          </div>
        ))
      ) : (
        <p className="no-articles">No articles available</p>
      )}
    </div>
  );
}

export default Articles;
