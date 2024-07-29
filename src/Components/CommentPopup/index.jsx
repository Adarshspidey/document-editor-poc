import React, { useState, forwardRef } from "react";

const CommentPopup = forwardRef(({ onAddComment }, ref) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <div className="comment-popup" ref={ref}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add your comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
});

export default CommentPopup;
