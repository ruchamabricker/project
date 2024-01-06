import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Albums() {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);
  const albumsElements = albums.map((album, index) => (
    <div key={album.id} className="album-item">
      <Link
        to={`/home/users/:id/albums/${album.id}`}
        aria-label={`View photos of ${album.title}`}
      >
        <span>{index + 1}</span> {/* Displaying the index (1-based) */}
        <h3>{album.title}</h3> {/* Displaying the title of the album */}
      </Link>
    </div>
  ));
  return <div className="albums">{albumsElements}</div>;
}

export default Albums;
