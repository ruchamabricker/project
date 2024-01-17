import { useState } from "react";
import Comments from "../components/Comments";
import { useServer } from "./Server";

function PostDetails({ userId, id, title, body, setPosts, setPostInRead }) {
  const { currentUser, updateDataOnServer } = useServer();

  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  function handleReadComments() {
    setShowComments((prevShowComments) => !prevShowComments);
  }

  function handleEdit() {
    userId == currentUser.id
      ? setIsEditing((prev) => !prev)
      : alert("You can not edit this post");
  }

  function handleSave() {
    setIsEditing(false);

    updateDataOnServer(
      "posts",
      { id: id, title: editedTitle, body: editedBody },
      "PATCH",
      setPosts
    );
  }

  const handleBackToAllPosts = () => {
    setPostInRead(false);
  };

  return (
    <>
      <button onClick={handleBackToAllPosts}> Back to All Posts</button>
      <div key={id} className="post-item">
        <br />
        <span>{id}</span>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            />
          </>
        ) : (
          <>
            <h4>{editedTitle}</h4>
            <h5>{editedBody}</h5>
          </>
        )}
        <br />
        <button onClick={handleEdit}>Edit</button>
        <br></br>
        {isEditing && <button onClick={handleSave}>Save</button>}
        <br></br>
        <button onClick={handleReadComments}>Read comments</button>
        <br />
        {showComments && <Comments id={id} />}
      </div>
    </>
  );
}
export default PostDetails;
