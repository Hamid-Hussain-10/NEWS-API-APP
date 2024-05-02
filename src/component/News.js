import React, { useState, useEffect, useContext } from "react";
import { NewsContext } from "./NewsContext";
import NewsArticle from "./NewsArticle";

function News() {
  const { data } = useContext(NewsContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState(""); 
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSource, setFilterSource] = useState(""); 
  const [filterAuthor, setFilterAuthor] = useState(""); 


  useEffect(() => {
    if (data) {
      let filteredArticles = data.articles;

      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (filterDate) {
        filteredArticles = filteredArticles.filter((article) =>
          article.publishedAt.includes(filterDate)
        );
      }

      if (filterCategory) {
        filteredArticles = filteredArticles.filter((article) =>
  article.title && article.title.toLowerCase().includes(searchKeyword.toLowerCase())
);

      }

      if (filterSource) {
        filteredArticles = filteredArticles.filter((article) =>
          article.source.name.toLowerCase().includes(filterSource.toLowerCase())
        );
      }

      if (filterAuthor) {
        filteredArticles = filteredArticles.filter((article) =>
  article.title && article.title.toLowerCase().includes(searchKeyword.toLowerCase())
);

      }

      setFilteredData(filteredArticles);
    }
  }, [data, searchKeyword, filterDate, filterCategory, filterSource, filterAuthor]);

  const handleSearch = () => {

  };

  return (
    <div>
      <h1 className="head__text">News Aggregator</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="filter-bar">
        <label htmlFor="dateFilter">Date:</label>
        <input
          type="date"
          id="dateFilter"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <label htmlFor="categoryFilter">Category:</label>
        <input
          type="text"
          id="categoryFilter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <label htmlFor="sourceFilter">Source:</label>
        <input
          type="text"
          id="sourceFilter"
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
        />
        <label htmlFor="authorFilter">Author:</label>
        <input
          type="text"
          id="authorFilter"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        />
      </div>
      <div className="all__news">
        {filteredData.length > 0 ? (
          filteredData.map((news) => (
            <div key={news.url}>
              <NewsArticle data={news} />
              
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default News;
