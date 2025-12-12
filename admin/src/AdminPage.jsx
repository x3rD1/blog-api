import { useState } from "react";
import { Link } from "react-router";
import styles from "./AdminPage.module.css";

const mockPosts = [
  {
    id: 1,
    title: "The End of Dashboards and Design Systems",
    author: "Michal Malewicz",
    isPublished: true,
    date: "Nov 26",
  },
  {
    id: 2,
    title: "Partner Program Update",
    author: "Medium Staff",
    isPublished: false,
    date: "3d ago",
  },
];

const mockComments = [
  {
    id: 1,
    postId: 1,
    author: "Chiefrooks",
    text: "It looks good.",
    date: "Nov 18",
  },
  {
    id: 2,
    postId: 1,
    author: "Moody Adel",
    text: "Amazing",
    date: "Nov 12",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

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

  const deleteComment = (commentId) => {
    if (window.confirm("Delete this comment?")) {
      console.log("Delete comment:", commentId);
      // Add API call here
    }
  };

  const saveEdit = () => {
    console.log("Saving:", editText);
    setEditingPost(null);
    setEditingComment(null);
    setEditText("");
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "posts" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts ({mockPosts.length})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "comments" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments ({mockComments.length})
          </button>
        </div>
      </div>

      {activeTab === "posts" && (
        <div className={styles.list}>
          {mockPosts.map((post) => (
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
                  {post.author} · {post.date} ·{" "}
                  {post.isPublished ? "Published" : "Draft"}
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
                      {post.isPublished ? "Unpublish" : "Publish"}
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

      {activeTab === "comments" && (
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
      )}
    </div>
  );
}
