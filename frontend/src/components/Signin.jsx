import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Signin.module.css";

export default function Signin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/blogs");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinBox}>
        <h1 className={styles.heading}>Sign in to your account</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign in
          </button>
        </form>

        <p className={styles.footerText}>
          No account?{" "}
          <Link to="/signup" className={styles.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
