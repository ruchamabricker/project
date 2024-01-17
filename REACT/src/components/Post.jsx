import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServer } from "./Server";

function Post({
  userId,
  id,
  title,
  body,
  setPostInRead,
  setPostInReadDetails,
  setPosts,
}) {
  const { currentUser, updateDataOnServer, fetchData } = useServer();
  const [postComments, setPostComments] = useState([]);
  const navigate = useNavigate();

  function handleDeletePost() {
    if (userId == currentUser.id) {
      updateDataOnServer("posts", { id }, "DELETE", setPosts);
      fetchData("comments", "postId", id, setPostComments);
      postComments.map((postComment) =>
        updateDataOnServer("comments", postComment, "DELETE", null)
      );
    } else {
      alert("This post is not yours. You can not delete it!");
    }
  }

  function handleReadPost() {
    setPostInRead(true);
    setPostInReadDetails({ userId, id, title, body });
    navigate(`/home/users/${currentUser.id}/posts/${id}`);
  }

  return (
    <div key={id} className="post-item">
      <span>{id}</span>
      <h3>{title}</h3>
      <button onClick={handleReadPost}>Read post</button>
      <br></br>
      <button onClick={handleDeletePost}>Delete</button>
    </div>
  );
}
export default Post;
