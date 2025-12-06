import styles from "./IndexPage.module.css";

function IndexPage() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.heading}>
          <h2>
            Write freely <br />
            Read deeply
          </h2>
        </div>
        <div className={styles.subtitle}>
          <p>A home for thoughts that shape who we become.</p>
        </div>
        <div className={styles.buttonContainer}>
          <button>Start reading</button>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
