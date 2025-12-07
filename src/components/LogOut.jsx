import { Link } from "react-router";
import styles from "../assets/css/LogOut.module.css";

function LogOut() {
  localStorage.clear();
  return (
    <main className={styles.container}>
      <p className={styles.text}>You're logged out</p>
      <Link className={styles.loginLink} to={"/login"}>Log in</Link>
    </main>
  );
}

export default LogOut;
