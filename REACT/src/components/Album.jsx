import { Link } from "react-router-dom";
import React from "react";
import { useServer } from "./Server";

function Album({ id, title }) {
  const { currentUser } = useServer();

  return (
    <div key={id} className="album-item">
      <Link
        to={`/home/users/${currentUser.id}/albums/${id}`}
        aria-label={`View photos of ${title}`}
      >
        <span>{id}</span>
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

export default Album;
