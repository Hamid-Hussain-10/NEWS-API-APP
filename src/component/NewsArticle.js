import React from "react";

function NewsArticle({ data }) {
  return (
    <>
    <section className="text-gray-600 body-font news">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full image">
          <img alt="news1" src={data.urlToImage} width="100%" />
          <div className="mt-4">
            <h2 className="text-white-900 text-xs tracking-widest title-font mb-1">
            {data.title.slice(0, 35).toUpperCase()}
            </h2>
            <p className="mt-1 news__desc">{data.description.slice(0, 100)}</p>
          </div>
          <span className="news__published">{data.publishedAt}</span>
          <span className="news__source">{data.source.name}</span>
          <span className="news__author">{data.author}</span>
        </div>
      </div>
    </div>
  </section>

</>
  );
}

export default NewsArticle;
