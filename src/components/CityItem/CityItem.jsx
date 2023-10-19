import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCities from "../../hooks/useCities";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

const CityItem = ({ city }) => {
  const {
    currentCity: { id: activeCityID },
    deleteCity,
  } = useCities();

  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city || {};

  function handleCityDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          activeCityID === id ? `${styles["cityItem--active"]}` : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time dateTime={date} className={styles.date}>
          {formatDate(date)}
        </time>
        <button className={styles.deleteBtn} onClick={handleCityDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
