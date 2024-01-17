import React, { useState } from "react";
import { useServer } from "./Server";

function Comment({ id, name, email, body, setComments }) {
  const { currentUser, updateDataOnServer } = useServer();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedBody, setEditedBody] = useState(body);

  function handleDelete() {
    email == currentUser.email
      ? updateDataOnServer("comments", { id }, "DELETE", setComments)
      : alert("You can't delete this comment. You didn't write it!");
  }

  function handleEdit() {
    email === currentUser.email
      ? setIsEditing((prev) => !prev)
      : alert("You can't update this comment. You didn't write it!");
  }

  function handleSave() {
    setIsEditing(false);

    updateDataOnServer(
      "comments",
      { id: id, name: editedName, body: editedBody },
      "PATCH",
      setComments
    );
  }

  return (
    <div className="comment-item">
      {isEditing ? (
        <>
          <p>ID: {id}</p>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <p>Email: {email}</p>
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          ></textarea>
        </>
      ) : (
        <>
          <p>ID: {id}</p>
          <p>Name: {editedName}</p>
          <p>Email: {email}</p>
          <p>Body: {editedBody}</p>
        </>
      )}
      <button onClick={handleDelete}>delete</button>
      <br></br>
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
}

export default Comment;
