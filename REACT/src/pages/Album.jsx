import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServer } from "../components/Server";
import Photo from "../components/Photo";

function Album() {
  let { albumId } = useParams();
  const { updateDataOnServer, fetchData } = useServer();

  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({
    albumId,
    thumbnailUrl: "",
    url: "",
  });
  const [numPhotos, setNumPhotos] = useState(0);
  const [toAddPhoto, setToAddPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchData(
      "photos",
      "albumId",
      albumId,
      setPhotos,
      numPhotos,
      limit
    ).finally(() => setIsLoading(false));
  }, [numPhotos]);

  function handleAddPhoto() {
    const initialUrl = "https://via.placeholder.com/150/";
    const updatedThumbnailUrl = photo.thumbnailUrl.startsWith(initialUrl)
      ? photo.thumbnailUrl
      : initialUrl + photo.thumbnailUrl;
    const updatedUrl = photo.url.startsWith(initialUrl)
      ? photo.url
      : initialUrl + photo.url;

    const newPhoto = {
      ...photo,
      thumbnailUrl: updatedThumbnailUrl,
      url: updatedUrl,
    };

    updateDataOnServer("photos", newPhoto, "POST", setPhotos);
    setToAddPhoto(false);
  }

  function handleAddPhotoClick() {
    setToAddPhoto((prevToAddPhoto) => !prevToAddPhoto);
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "thumbnailUrl") {
      const initialUrl = "https://via.placeholder.com/150/";
      const updatedUrl = value.startsWith(initialUrl)
        ? value
        : initialUrl + value;
      setPhoto((prevPhoto) => ({ ...prevPhoto, [name]: updatedUrl }));
    } else {
      setPhoto((prevPhoto) => ({ ...prevPhoto, [name]: value }));
    }
  }

  function handleLoadMore() {
    setNumPhotos((prevNumPhotos) => prevNumPhotos + limit);
  }

  function handleLoadPrevious() {
    setNumPhotos((prevNumPhotos) => prevNumPhotos - limit);
  }

  return (
    <div>
      <h1>Album {albumId}</h1>
      <button onClick={handleAddPhotoClick}>Add Photo</button>
      {toAddPhoto && (
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
          <button onClick={() => handleAddPhoto()}>save</button>
        </div>
      )}
      {isLoading && <h1>Loading...</h1>}
      <div className="photos-list">
        {photos.map((photo) => (
          <Photo key={photo.id} {...photo} setPhotos={setPhotos} />
        ))}
      </div>
      <br></br>
      <button onClick={handleLoadPrevious}>Previous</button>
      <button onClick={handleLoadMore}>Next</button>
    </div>
  );
}

export default Album;
