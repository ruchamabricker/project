import React from "react";
import { useServer } from "../components/Server";

function Home() {
  const { currentUser } = useServer();
  return <h1>{currentUser.name}</h1>;
}

export default Home;
