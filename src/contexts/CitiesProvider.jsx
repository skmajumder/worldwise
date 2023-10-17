import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;
// const LOCAL_PATH = "/cities.json";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCityList() {
      try {
        setIsLoading(true);
        const req = await fetch(`${BASE_URL}/cities`, {
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

  // Create an AbortController
  async function getCity(id) {
    try {
      setIsLoading(true);
      const req = await fetch(`${BASE_URL}/cities/${id}`);

      if (!req.ok) {
        throw new Error(`Something went wrong while fetching city`);
      }

      const res = await req.json();
      setCurrentCity(res);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const values = {
    cities,
    isLoading,
    currentCity,
    getCity,
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
