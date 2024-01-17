import React, { useState, useContext } from "react";
import { useServer } from "./Server";

function Photo({ id, title, url, thumbnailUrl, setPhotos }) {
  const { updateDataOnServer } = useServer();

  const [toUpdateDetails, setToUpdateDetails] = useState(false);
  const [photo, setPhoto] = useState({ id, title, url, thumbnailUrl });
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdateClick() {
    setToUpdateDetails((prevToUpdateDetails) => !prevToUpdateDetails);
  }

  function handleDelete(photo) {
    updateDataOnServer("photos", photo, "DELETE", setPhotos);
  }

  function handleUpdatePhoto() {
    setIsUpdating(true);
    updateDataOnServer("photos", photo, "PATCH", setPhotos).finally(() => {
      setIsUpdating(false);
      setToUpdateDetails(false);
    });
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "thumbnailUrl") {
      const initialUrl = "https://via.placeholder.com/150";
      const updatedUrl = initialUrl + value.substring(initialUrl.length);
      setPhoto((prevPhoto) => ({
        ...prevPhoto,
        [name]: value,
        url: updatedUrl,
      }));
    } else {
      setPhoto((prevPhoto) => ({ ...prevPhoto, [name]: value }));
    }
  }

  return (
    <>
      <div key={id} className={`photo-item ${isUpdating ? "updating" : ""}`}>
        {isUpdating ? (
          <h1> Loading...</h1>
        ) : (
          <img src={thumbnailUrl} alt={title} />
        )}
        <br></br>
        <button onClick={() => handleDelete({ id })}>delete</button>
        <br></br>
        <button onClick={handleUpdateClick}>update</button>
        {toUpdateDetails && (
          <div>
            <label>title</label>
            <textarea
              name="title"
              value={photo.title}
              onChange={handleChange}
              rows={4}
            ></textarea>
            <label>url</label>
            <textarea
              name="thumbnailUrl"
              value={photo.thumbnailUrl}
              onChange={handleChange}
              rows={4}
            ></textarea>
            <br></br>
            <button onClick={handleUpdatePhoto}>save</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Photo;
