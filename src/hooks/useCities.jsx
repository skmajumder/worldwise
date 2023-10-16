import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesProvider";

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
};

export default useCities;
