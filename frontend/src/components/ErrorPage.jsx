import { Link } from "react-router";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          Sorry, the page you were looking for does not exist.
        </p>
        <Link to="/" className={styles.homeLink}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
