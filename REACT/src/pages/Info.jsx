import React, { useEffect } from "react";
import { useServer } from "../components/Server";

function Info() {
  const { currentUser } = useServer();
  return (
    <div>
      <h1>YOUR INFORMATION</h1>
      <h2>ID: {currentUser.id}</h2>
      <h2>Name: {currentUser.name}</h2>
      <h2>Username: {currentUser.username}</h2>
      <h2>Address: </h2>
      <h2>Street: {currentUser.address.street}</h2>
      <h2>City: {currentUser.address.city}</h2>
      <h2>Suite: {currentUser.address.suite}</h2>
      <h2>Zipcode: {currentUser.address.zipcode}</h2>
      <h2>Latitude: {currentUser.address.geo.lat}</h2>
      <h2>Longitude: {currentUser.address.geo.lng}</h2>
      <h2>Phone: {currentUser.phone}</h2>
      <h2>Website: {currentUser.website}</h2>
      <h2>Company: </h2>
      <h2>Name: {currentUser.company.name}</h2>
      <h2>CatchPhrase: {currentUser.company.catchPhrase}</h2>
      <h2>Bs: {currentUser.company.bs}</h2>
    </div>
  );
}

export default Info;
