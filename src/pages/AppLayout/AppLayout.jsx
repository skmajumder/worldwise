import Sidebar from "../../components/Sidebar/sidebar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css"

const AppLayout = () => {
  return (
    <section className={styles.app}>
      <Sidebar/>
      <Map/>
    </section>
  );
};

export default AppLayout;