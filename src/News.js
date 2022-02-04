import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import db from "./Firebase.js";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    db.collection("News").onSnapshot((snapshot) => {
      setNews(snapshot.docs.map((doc) => doc.data()));
    });
    console.log(news);
  }, []);

  return (
    <>
      <p style={{ fontSize: "2rem", fontFamily: "Russo One", color: "white" }}>
        Latest Action
      </p>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,18vw)",
          gridAutoRows: "auto",
          listStyle: "none",
        }}
      >
        {news.length!=0 ? (
          news.map((article, index) => {
            return (
              <li
               id={index.toString()}
                key={index.toString()}
                className={index%2==0?'newsListItem1':'newsListItem2'}
                onMouseOver={()=>document.getElementById(index.toString()).style.opacity=1}
                onMouseOut={()=>document.getElementById(index.toString()).style.opacity=0.9}
              >
                  <a  target="_blank" style={{width:'100%',height:'100%',textDecoration:'none',color:"white"}}href={article.url}>
                   {article.imageUrl? (
                  <img
                    style={{ width: "100%", height: "65%" }}
                    src={article.imageUrl}
                  />  
                ) : (
                  <img
                    style={{ width: "100%", height: "65%" }}
                    src={require('./Assets/noNews.png')}
                  />  
                )} 
                <span style={{fontSize:'1.2rem',textAlign:'center',marginTop:'1vh',fontFamily:'Quicksand',fontWeight:'bold'}}>
                 {article.title}   
                </span>
                </a>
              </li>
            );
          })
        ) : (
          <div className="spinner"></div>
        )}  
      </ul>
    </>
  );
};

export default News;
