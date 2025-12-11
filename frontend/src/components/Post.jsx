import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Post.module.css";
import TimeAgo from "./formatDate/TimeAgo";
import { AuthContext } from "../context/AuthContext";

function Post() {
  const { accessToken } = useContext(AuthContext);
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setComments(data.post.comments);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  const handleRespond = async () => {
    if (!accessToken) {
      navigate("/signin");
      return;
    }

    const res = await fetch(`/api/posts/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ comment: body }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    alert(data.message);
    setComments((prev) => [data.comment, ...prev]);
    setBody("");
  };

  if (!post.success)
    return <div className={styles.loading}>{post.message}</div>;

  return (
    <div className={styles.postContainer}>
      <header className={styles.postHeader}>
        <h1 className={styles.title}>{post.post.title}</h1>

        <div className={styles.authorBar}>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              Written by <i>{post.post.author.username}</i>
            </span>
            <span className={styles.postMeta}>
              <TimeAgo createdAt={post.post.updatedAt} />
            </span>
          </div>
        </div>
      </header>

      <article
        className={styles.postBody}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsHeader}>Responses ({comments.length})</h2>

        <div className={styles.commentInputWrapper}>
          <textarea
            placeholder="What are your thoughts?"
            className={styles.commentInput}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="3"
          />
          <button
            onClick={handleRespond}
            disabled={!body.trim()}
            className={styles.commentSubmitBtn}
          >
            Respond
          </button>
        </div>

        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentMeta}>
                <span className={styles.commentAuthor}>
                  {comment.author.username}
                </span>
                <span className={styles.commentDate}>
                  <TimeAgo createdAt={comment.updatedAt} />
                </span>
              </div>
              <p className={styles.commentText}>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
