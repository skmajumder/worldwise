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
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.name);
          console.log(error.message);
        }
      }
    }

    fetchCityList();

    return () => {
      controller.abort();
    };
  }, []);

  async function getCity(id, controller) {
    try {
      setIsLoading(true);
      const req = await fetch(`${BASE_URL}/cities/${id}`, {
        signal: controller.signal,
      });

      if (!req.ok) {
        throw new Error(`Something went wrong while fetching city`);
      }

      const res = await req.json();
      setCurrentCity(res);
      setIsLoading(false);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.name);
        console.log(error.message);
      }
    }
  }

  async function createNewCity(newCity) {
    try {
      setIsLoading(true);
      const req = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!req.ok) {
        throw new Error(`Something went wrong POST request`);
      }

      const data = await req.json();
      setCities((cities) => [...cities, data]);
      
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const values = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createNewCity,
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
