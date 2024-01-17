import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { useServer } from "./Server";

function Comments({ id }) {
  const { currentUser, updateDataOnServer, fetchData } = useServer();

  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [newComment, setNewComment] = useState({
    body: "",
    name: "",
  });

  useEffect(() => {
    fetchData("comments", "postId", id, setComments);
  }, []);

  function handleAddComment() {
    setAddComment((prevAddComment) => !prevAddComment);
  }

  function handleInputChangeComment(e) {
    const { name, value } = e.target;
    setNewComment((prevNewComment) => ({ ...prevNewComment, [name]: value }));
  }

  function handleSaveComment() {
    const commentData = {
      ...newComment,
      postId: id,
      email: currentUser.email,
    };
    updateDataOnServer("comments", commentData, "POST", setComments);
    setAddComment(false);
  }

  return (
    <>
      <button onClick={handleAddComment}>add comment</button>
      {addComment && (
        <div>
          <input
            placeholder="name"
            name="name"
            value={newComment.name}
            onChange={handleInputChangeComment}
          />
          <input
            placeholder="body"
            name="body"
            value={newComment.body}
            onChange={handleInputChangeComment}
          />
          <button onClick={handleSaveComment}>save</button>
        </div>
      )}
      {comments.map((comment) => {
        return (
          <Comment key={comment.id} {...comment} setComments={setComments} />
        );
      })}
    </>
  );
}

export default Comments;
