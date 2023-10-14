import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import AppLayout from "./pages/AppLayout/AppLayout";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";

const BASE_URL = `http://localhost:8000/cities`;
// const LOCAL_PATH = "/cities.json";

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cityProps = { cities, isLoading };

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList {...cityProps} />} />
          <Route path="cities" element={<CityList {...cityProps} />} />
          <Route path="countries" element={<CountryList {...cityProps} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
