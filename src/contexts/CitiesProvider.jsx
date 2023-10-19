import { createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "cities/created":
      return { ...state };

    case "cities/deleted":
      return { ...state };

    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCityList() {
      dispatch({ type: "loading" });
      try {
        const req = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });

        if (!req.ok) {
          throw new Error(`Something went wrong while fetching`);
        }

        const res = await req.json();
        dispatch({ type: "cities/loaded", payload: res });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({ type: "rejected", payload: error.message });
        }
      }
    }

    fetchCityList();

    return () => {
      controller.abort();
    };
  }, []);

  async function getCity(id, controller) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE_URL}/cities/${id}`, {
        signal: controller.signal,
      });

      if (!req.ok) {
        throw new Error(`Something went wrong while fetching city`);
      }

      const res = await req.json();
      dispatch({ type: "city/loaded", payload: res });
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch({ type: "rejected", payload: error.message });
      }
    }
  }

  async function createNewCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!req.ok) {
        throw new Error(`Something went wrong to create city.`);
      }

      const data = await req.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteCity(cityID) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${cityID}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((c) => c.id !== cityID));
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
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
