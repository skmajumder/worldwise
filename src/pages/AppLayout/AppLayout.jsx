import Sidebar from "../../components/Sidebar/sidebar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import User from "../../components/User/User";

const AppLayout = () => {
  return (
    <section className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </section>
  );
};

export default AppLayout;
