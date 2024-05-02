import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const [userPreferences, setUserPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });
  const apiKey2 = 'umGkJuARdFjwb2Vpnl0hgkzGOqXscn3w';

  useEffect(() => {
    const { sources, categories, authors } = userPreferences;
    let apiUrl2 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=world&api-key=${apiKey2}`;

    if (sources.length > 0) {
      const sourcesQuery = sources.join(',');
      apiUrl2 += `&sources=${sourcesQuery}`;
    }

    if (categories.length > 0) {
      const categoriesQuery = categories.join(',');
      apiUrl2 += `&categories=${categoriesQuery}`;
    }

    if (authors.length > 0) {
      const authorsQuery = authors.join(',');
      apiUrl2 += `&authors=${authorsQuery}`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl2);
        setData(response.data.response.docs);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, [userPreferences, apiKey2]);

  return (
    <>
      <NewsContext.Provider value={{ data, userPreferences, setUserPreferences }}>
        {props.children}
          {/* <h1>New York Times News</h1> */}
          <div className='all__news'>
          {data &&
                 data.map((article, index) => (
                    <div key={index}>
                    <section className="text-gray-600 body-font news">
                        <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                    <div className='image lg:w-1/4 md:w-1/2 p-4 w-full'>
                    {article.multimedia && article.multimedia.length > 0 && (
                     <img  width="100%"
                    src={`https://www.nytimes.com/${article.multimedia[0].url}`}
                    alt={article.multimedia[0].caption || ''} />
                )}
                    </div>
                      <div className="mt-4">
                     <h2 className="text-white-500 text-xs tracking-widest title-font mb-1 ">
                      {article.abstract.slice(0, 30)}
                 </h2>
                <p className="mt-1 news__desc">{article.abstract.slice(0, 100)}</p>
                <p className='mt-1 news__desc'>{article.lead_paragraph.slice(0, 100)}</p>
          </div>
        </div>
      </div>
  </section>
  </div>
   ))}
    </div>
    </NewsContext.Provider>
    </>
  );
};

export default NewsContextProvider;
