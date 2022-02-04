import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [currDate, setCurrDate] = useState(null);
  const [currMonth, setCurrMonth] = useState(null);
  const [currYear, setCurrYear] = useState(null);

  useEffect(() => {
    handleCurrDate();
    getNews();
  }, []);

  const handleCurrDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    setCurrYear(Number(today.slice(0, 4)));
    let month = today.slice(5, 7);
    setCurrMonth(Number(month));

    let date = today.slice(8, 10);
    setCurrDate(Number(date));
  };
  

  const getNews = () => {
    axios
      .get(
        `//api.mediastack.com/v1/news?access_key=1d84a4089d10d03df6d9d8647c886f18&keywords=f1&languages=en&date=${currYear}-${currMonth}-${currDate}`
      )
      .then((response) => {
        if (response.data) {
          setNews(response.data.data);
         
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
     
      <p style={{fontSize:'2rem',fontFamily:'Russo One',color:'white'}}>Latest Action</p>
      <ul style={{ display: "grid", gridTemplateColumns:'repeat(5,18vw)',gridAutoRows:'auto',listStyle: "none" }}>
        {news.length!=0 ? (
          news.slice(0, 10).map((article, index) => {
            return (
              <li
               id={index.toString()}
                key={index.toString()}
                className={index%2==0?'newsListItem1':'newsListItem2'}
                onMouseOver={()=>document.getElementById(index.toString()).style.opacity=1}
                onMouseOut={()=>document.getElementById(index.toString()).style.opacity=0.9}
              >
                  <a  target="_blank" style={{width:'100%',height:'100%',textDecoration:'none',color:"white"}}href={article.url}>
                   {article.image ? (
                  <img
                    style={{ width: "100%", height: "65%" }}
                    src={article.image}
                  />
                ) : (
                  <p>NO image</p>
                )} 
                <span style={{fontSize:'1.1rem',textAlign:'center',marginTop:'1vh',fontFamily:'Quicksand',fontWeight:'bold'}}>
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
