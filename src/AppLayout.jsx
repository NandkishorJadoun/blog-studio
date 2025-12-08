import { Link, Outlet } from "react-router";
import styles from "./assets/css/AppLayout.module.css";

import NavigationLoadingBar from "./components/NavigationLoadingBar";

function AppLayout() {
  return (
    <>
      /* <NavigationLoadingBar /> */
      <header className={styles.header}>
        <Link className={styles.headerLink} to={"/"}>
          Studio
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to={"/create"}>
            Create
          </Link>
          <Link className={styles.navLink} to={"/logout"}>
            Logout
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default AppLayout;
