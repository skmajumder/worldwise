import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* Dynamic components will show there */}
      <Outlet />

      <Footer />
    </aside>
  );
};

export default Sidebar;
