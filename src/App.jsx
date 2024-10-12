// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const countryCode = import.meta.env.VITE_COUNTRY_CODE;

  useEffect(() => {
    if (!apiKey || !countryCode) {
      setError("Missing API key or country code.");
      setLoading(false);
      return;
    }

    fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error("No articles found in the response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [countryCode, apiKey]);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="news">News Dashboard</div>
      <h1>📰 Top headlines</h1>
      <div className="news-container">
      
        {articles && articles.map((article, index) => (
          article.source.name !== "[Removed]" && (
          
          <div key={index} className="news-card">
              <img
                src={article.urlToImage? article.urlToImage: "newsimg.jpeg"} 
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
          
          )
        ))}
      </div>
    </div>
  );
}

export default App;
