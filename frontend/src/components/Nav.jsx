import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.navbar}>
      <div>
        <a href="#" className={styles.logo}>
          Sulat
        </a>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="#">Blogs</a>
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
