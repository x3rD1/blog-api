import { useContext, useState } from "react";
import { Link } from "react-router";
import styles from "./Signup.module.css";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup, errors, setErrors, existError } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await signup(username, email, password, confirmPassword);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h1 className={styles.heading}>Create your account</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className={styles.input}
              required
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
          </div>

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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            {existError && <p style={{ color: "red" }}>{existError}</p>}
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
              placeholder="Create a password"
              className={styles.input}
              required
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={styles.input}
              required
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create account
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link to="/signin" className={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
