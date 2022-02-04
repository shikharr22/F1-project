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
        `//newsapi.org/v2/everything?excludeDomains=reuters.com,bbc.com.uk,9to5mac.com&language=en&q=f1 OR "formula one"&from=${currYear}-${currMonth}-${currDate}&apiKey=771c39d68db1446092fea1cc28a59a88`
      )
      .then((response) => {
        if (response.data) {
          setNews(response.data.articles);
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
                  {article.urlToImage ? (
                  <img
                    style={{ width: "100%", height: "65%" }}
                    src={article.urlToImage}
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
          <div  style={{position:'relative',top:'50%'}} className="spinner"></div>
        )}
      </ul>
    </>
  );
};

export default News;
