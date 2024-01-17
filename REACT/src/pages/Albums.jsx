import { useState, useEffect, useContext } from "react";
import Album from "../components/Album";
import { useServer } from "../components/Server";

const Albums = () => {
  const { currentUser, fetchData, updateDataOnServer } = useServer();

  const [albums, setAlbums] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ id: "", title: "" });
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    userId: currentUser.id,
    title: "",
  });
  const [addAlbum, setAddAlbum] = useState(false);

  useEffect(() => {
    fetchData("albums", "userId", currentUser.id, setAlbums);
  }, []);

  useEffect(() => {
    setSearchedAlbums(albums);
  }, [albums]);

  useEffect(() => {
    handleSearch();
  }, [searchCriteria]);

  const handleSearch = () => {
    const filteredAlbums = albums.filter((album) => {
      return (
        album.id.toString().includes(searchCriteria.id) &&
        album.title.includes(searchCriteria.title)
      );
    });
    setSearchedAlbums(filteredAlbums);
  };

  const handleInputChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  const handleCreateAlbumClick = () => {
    setAddAlbum((prevStateAddAlbum) => !prevStateAddAlbum);
  };

  const handleSaveNewAlbum = () => {
    updateDataOnServer("albums", newAlbum, "POST", setAlbums);
    setAddAlbum((prevStateAddAlbum) => !prevStateAddAlbum);
    setNewAlbum((prevNewAlbum) => ({ ...prevNewAlbum, title: "" }));
  };

  return (
    <div className="albums">
      <h1>Albums</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchCriteria.id}
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, id: e.target.value })
          }
          placeholder="Search by serial number"
        />
        <input
          type="text"
          value={searchCriteria.title}
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, title: e.target.value })
          }
          placeholder="Search by title"
        />
      </div>

      <div className="create-album">
        <button onClick={handleCreateAlbumClick}>Create New Album</button>
        {addAlbum && (
          <div>
            <input
              name="title"
              value={newAlbum.title}
              onChange={handleInputChange}
              placeholder="enter new title"
            ></input>
            <button onClick={handleSaveNewAlbum}>save</button>
          </div>
        )}
      </div>

      {searchedAlbums.map((album) => (
        <Album key={album.id} {...album} />
      ))}
    </div>
  );
};

export default Albums;
