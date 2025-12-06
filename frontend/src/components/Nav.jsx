import { Link } from "react-router";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link to={"/"} className={styles.logo}>
          <h1>Katha</h1>
        </Link>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to={"blogs"}>Blogs</Link>
        </li>
        <li className={styles.menuItem}>
          <a href="#">Sign in</a>
        </li>
        <li className={styles.menuItem}>
          <a href="#">Sign up</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
