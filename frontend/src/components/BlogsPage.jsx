import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./BlogPage.module.css";
import TimeAgo from "../components/formatDate/TimeAgo";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState("For you");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch(`${BACKEND_URL}/api/posts`);
      if (!res.ok) return console.log("Failed to fetch /api/posts");
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      {blogs?.posts?.length !== 0 ? (
        <div className={styles.feedContainer}>
          <div className={styles.feedHeader}>
            <button
              className={`${styles.tab} ${
                activeTab === "For you" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("For you")}
            >
              For you
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "Featured" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Featured")}
            >
              Featured
            </button>
          </div>

          <div className={styles.postsList}>
            {blogs.map((post) => (
              <>
                <div key={post.id}>
                  <Link to={`/post/${post.slug}`} className={styles.postLink}>
                    <article className={styles.postCard}>
                      <div className={styles.postContent}>
                        <div className={styles.authorInfo}>
                          <div>
                            <span className={styles.authorName}>
                              {post.author.username}
                            </span>
                          </div>
                        </div>

                        <h3 className={styles.title}>{post.title}</h3>

                        <p
                          className={styles.preview}
                          dangerouslySetInnerHTML={{ __html: post.body }}
                        ></p>

                        <div className={styles.postFooter}>
                          <span className={styles.meta}>
                            <TimeAgo createdAt={post.updatedAt} />
                            {/* {post.readTime} */}
                          </span>
                          <div className={styles.actions}>
                            <button className={styles.commentBtn}>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {post.comments.length}
                            </button>
                            <button className={styles.bookmarkBtn}>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 2H18V22L12 18L6 22V2Z"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
                <hr className={styles.divider} />
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyBlog}>{blogs.message}</div>
      )}
    </>
  );
}
