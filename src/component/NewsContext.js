import React, { createContext, useEffect, useState } from "react";
import NewsComponent from "./NewsComponent";
// import NewsComponents from "./NewsComponents";
import axios from "axios";
import '../App.css';

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const [userPreferences, setUserPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });
  const apiKey1 = "b1be894148a746a3824154bf01866fcc";

  useEffect(() => {
    const { sources, categories, authors } = userPreferences;
    let apiUrl1 = `https://newsapi.org/v2/everything?q=pakistan&apiKey=${apiKey1}`;

    if (sources.length > 0) {
      const sourcesQuery = sources.join(",");
      apiUrl1 += `&sources=${sourcesQuery}`;
    }

    if (categories.length > 0) {
      const categoriesQuery = categories.join(",");
      apiUrl1 += `&categories=${categoriesQuery}`;
    }

    if (authors.length > 0) {
      const authorsQuery = authors.join(",");
      apiUrl1 += `&authors=${authorsQuery}`;
    }

    axios
      .get(apiUrl1)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
      
  }, [userPreferences]);

  return (
    <>
    <NewsContext.Provider value={{ data, userPreferences, setUserPreferences }}>
      {props.children}
      <NewsComponent/>
      {/* <NewsComponents/> */}
    </NewsContext.Provider>
    
    </>
  );
};
