// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const id = "0ba5fa4bbcd34337b55ed343c6686b7d";
  const country = "us";

  useEffect(() => {

    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="App">
      <div className="news">News Dashbord</div>
      <h1>📰 Top headlines</h1>
      <div className="news-container">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="news-image"
            />
            <h2 className="news-title">{article.title}</h2>
            <p className="news-description">{article.description}</p>
            <p className="news-meta">
              <span>By {article.author || "Unknown"}</span> |{" "}
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>{" "}
              | <span>{article.source.name}</span>
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
