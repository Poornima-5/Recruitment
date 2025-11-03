import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import styles from "./PostCard.module.css";

const PostCard = ({ post, profile }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;

    setLiked(newLiked);
    setLikeCount(newCount);

    try {
      const { error } = await supabase
        .from("posts")
        .update({ likes: newCount })
        .eq("id", post.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating likes:", error);
      setLiked(!newLiked);
      setLikeCount(liked ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: post.id,
          content: newComment,
          author: profile?.name || "Anonymous",
          avatar: profile?.avatar || "👨",
        })
        .select()
        .single();

      if (error) throw error;

      setComments([data, ...comments]);
      setNewComment("");

      const newCommentCount = commentCount + 1;
      setCommentCount(newCommentCount);

      await supabase
        .from("posts")
        .update({ comments: newCommentCount })
        .eq("id", post.id);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return "1 month ago";
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>{post.avatar}</div>
          <div>
            <h4 className={styles.authorName}>{post.author}</h4>
            <p className={styles.time}>{formatTime(post.created_at)}</p>
          </div>
        </div>
        <button className={styles.menuButton}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <p className={styles.content}>{post.content}</p>

      {post.image && (
        <img src={post.image} alt="Post content" className={styles.image} />
      )}

      <div className={styles.actions}>
        <button
          onClick={handleLike}
          className={`${styles.actionButton} ${
            liked ? styles.actionButtonLiked : ""
          }`}
        >
          <svg
            fill={liked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span>{likeCount}</span>
        </button>

        <button
          className={styles.actionButton}
          onClick={() => setShowComments(!showComments)}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{commentCount}</span>
        </button>

        <button
          className={styles.replyButton}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide Comments" : "Reply"}
        </button>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.addComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              className={styles.commentInput}
            />
            <button onClick={handleAddComment} className={styles.commentButton}>
              Post
            </button>
          </div>

          {loadingComments ? (
            <div className={styles.loading}>Loading comments...</div>
          ) : (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentAvatar}>{comment.avatar}</div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>
                        {comment.author}
                      </span>
                      <span className={styles.commentTime}>
                        {formatTime(comment.created_at)}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
