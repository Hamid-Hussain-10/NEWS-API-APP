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
  const apiKey3 = 'a9d325fb-8509-47e3-a79a-63cf494ae74d';

  useEffect(() => {
    const { sources, categories, authors } = userPreferences;
    let apiUrl3 = `https://content.guardianapis.com/search?q=world&api-key=${apiKey3}`;

    if (sources.length > 0) {
      const sourcesQuery = sources.join(',');
      apiUrl3 += `&sources=${sourcesQuery}`;
    }

    if (categories.length > 0) {
      const categoriesQuery = categories.join(',');
      apiUrl3 += `&categories=${categoriesQuery}`;
    }

    if (authors.length > 0) {
      const authorsQuery = authors.join(',');
      apiUrl3 += `&authors=${authorsQuery}`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl3);
        const articles = response.data.response.results.map(article => ({
          webTitle: article.webTitle,
          webPublicationDate: article.webPublicationDate,
          webUrl: article.webUrl,
          sectionName : article.sectionName,
          imageUrl: article.fields && article.fields.thumbnail,
        }));
        setData(articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, [userPreferences, apiKey3]);

  return (
    <div>
      <NewsContext.Provider value={{ data, userPreferences, setUserPreferences }}>
        {props.children}
      {/* <h1>Guardian API Data</h1> */}
      <div className='newz'>
          {data &&
                 data.map((item, index) => (
                    <div key={index}>
                    <section className="text-gray-900 body-font news">
                        <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                        <div className='image lg:w-1/4 md:w-1/2 p-4 w-full'>
                        {item.imageUrl && 
                        <img src={item.imageUrl} alt="Article Thumbnail" width='100%'/>
                        }
                        </div>
                        <div className="mt-4">
                        <h2 className="text-white-500 text-xs tracking-widest title-font mb-1 ">
                        {item.webTitle.slice(0, 50)}
                        </h2>
                        <p className="mt-1 news__desc">{item.webUrl.slice(0, 100)}</p>
                        <p className='mt-1 news__desc'>{item.webPublicationDate.slice(0, 100)}</p>
                        <span>{item.sectionName}</span>
                        </div>
                        </div>
                    </div>
                </section>
                </div>
                ))}
            </div>
        </NewsContext.Provider>
    </div>
  );
};

export default NewsContextProvider;


