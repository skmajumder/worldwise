import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext(null);

const BASE_URL = `http://localhost:8000/cities`;
// const LOCAL_PATH = "/cities.json";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCityList() {
      try {
        setIsLoading(true);
        const req = await fetch(BASE_URL, {
          signal: controller.signal,
        });

        if (!req.ok) {
          throw new Error(`Something went wrong while fetching`);
        }

        const res = await req.json();
        setCities(res);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.name);
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCityList();

    return () => {
      controller.abort();
    };
  }, []);

  const values = {
    cities,
    isLoading,
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
