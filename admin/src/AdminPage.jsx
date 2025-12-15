import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import styles from "./AdminPage.module.css";
import AuthContext from "./context/authContext";

export default function AdminPage() {
  const { accessToken, loading, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [editingPost, setEditingPost] = useState(null);
  // const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    async function getAllPosts() {
      const res = await fetch("/api/posts/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setPosts(data);
    }
    getAllPosts();
  }, [accessToken, loading]);

  const togglePublish = (postId) => {
    console.log("Toggle publish for post:", postId);
    // Add API call here
  };

  const deletePost = (postId) => {
    if (window.confirm("Delete this post?")) {
      console.log("Delete post:", postId);
      // Add API call here
    }
  };

  // const deleteComment = (commentId) => {
  //   if (window.confirm("Delete this comment?")) {
  //     console.log("Delete comment:", commentId);
  //     // Add API call here
  //   }
  // };

  const saveEdit = () => {
    console.log("Saving:", editText);
    setEditingPost(null);
    // setEditingComment(null);
    setEditText("");
  };

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        throw new Error("No accessToken");
      }
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className={styles.logout}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.adminContainer}>
        <div className={styles.adminHeader}>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <div className={styles.tabs}>
            <div className={styles.viewTabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === "posts" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts ({posts.length})
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "comments" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("comments")}
              >
                {/* Comments ({mockComments.length}) */}
              </button>
            </div>
            <div className={styles.newPost}>
              <button onClick={() => navigate("/create")}>Create</button>
            </div>
          </div>
        </div>

        {activeTab === "posts" && (
          <div className={styles.list}>
            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post.id} className={styles.item}>
                  <div className={styles.itemContent}>
                    <h3 className={styles.itemTitle}>
                      {editingPost === post.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className={styles.editInput}
                        />
                      ) : (
                        post.title
                      )}
                    </h3>
                    <p className={styles.itemMeta}>
                      {post.author.username}{" "}
                      {post.publish ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className={styles.itemActions}>
                    {editingPost === post.id ? (
                      <>
                        <button className={styles.saveBtn} onClick={saveEdit}>
                          Save
                        </button>
                        <button
                          className={styles.cancelBtn}
                          onClick={() => setEditingPost(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.toggleBtn}
                          onClick={() => togglePublish(post.id)}
                        >
                          {post.publish ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          className={styles.editBtn}
                          onClick={() => {
                            setEditingPost(post.id);
                            setEditText(post.title);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* {activeTab === "comments" && (
        <div className={styles.list}>
          {mockComments.map((comment) => (
            <div key={comment.id} className={styles.item}>
              <div className={styles.itemContent}>
                <p className={styles.itemTitle}>
                  {editingComment === comment.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className={styles.editInput}
                    />
                  ) : (
                    comment.text
                  )}
                </p>
                <p className={styles.itemMeta}>
                  {comment.author} · {comment.date} · Post #{comment.postId}
                </p>
              </div>
              <div className={styles.itemActions}>
                {editingComment === comment.id ? (
                  <>
                    <button className={styles.saveBtn} onClick={saveEdit}>
                      Save
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setEditingComment(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditText(comment.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )} */}
      </div>
    </>
  );
}
