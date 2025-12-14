import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import TinyEditor from "./Editor";
import styles from "./CreatePost.module.css";
import AuthContext from "./context/authContext";

export default function CreatePost() {
  const { accessToken, loading } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      setError("Restoring session, please wait...");
      return;
    }

    if (!accessToken) {
      setError("You are not authenticated");
      return;
    }

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          body: content,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Create New Post</h1>
        <p className={styles.subheading}>Write something amazing</p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
            className={styles.titleInput}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Content</label>
          <div className={styles.editorWrapper}>
            <TinyEditor value={content} onChange={setContent} />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
          <Link to="/" className={styles.cancelLink}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
