import { Link, useNavigate } from "react-router";
import styles from "./Nav.module.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Nav() {
  const { accessToken, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to={"/"} className={styles.logo}>
          <h1>Katha</h1>
        </Link>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to={"blogs"}>
            <button>Blogs</button>
          </Link>
        </li>
        {accessToken ? (
          <>
            <li className={styles.menuItem}>
              <button>{user.username}</button>
            </li>
            <li className={styles.menuItem}>
              <button onClick={handleLogout}> Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.menuItem}>
              <Link to={"/signin"}>
                <button>Sign in</button>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to={"/signup"}>
                <button>Sign up</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
