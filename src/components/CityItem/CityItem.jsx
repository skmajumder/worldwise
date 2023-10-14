import styles from "./CityItem.module.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

const CityItem = ({ city }) => {
  const { cityName, emoji, date } = city || {};
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time dateTime={date} className={styles.date}>
        {formatDate(date)}
      </time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
