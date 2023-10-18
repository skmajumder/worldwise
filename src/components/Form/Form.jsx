// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocoadingError, setGeocoadingError] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    const controller = new AbortController();

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocoadingError("");

        const req = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          {
            signal: controller.signal,
          }
        );
        if (!req.ok) {
          throw new Error("Couldn't fetch location information");
        }
        const res = await req.json();

        if (!res.countryCode)
          throw new Error(
            "👋 That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(res.city || res.locality || "");
        setCountry(res.countryName || "");
        setEmoji(convertToEmoji(res.countryCode));

        setIsLoadingGeocoding(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setGeocoadingError(error.message);
        }
      }
    }

    fetchCityData();

    return () => {
      controller.abort();
    };
  }, [lat, lng]);

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere in the Map 🗺️"} />;

  if (isLoadingGeocoding) return <Spinner />;

  if (geocoadingError) return <Message message={geocoadingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          readOnly
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
