function TimeAgo({ createdAt }) {
  const date = new Date(createdAt);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return <span>Today</span>;
  if (diffInDays === 1) return <span>Yesterday</span>;
  if (diffInDays <= 7) return <span>{diffInDays} days ago</span>;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  return (
    <span>
      {date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>
  );
}

export default TimeAgo;
