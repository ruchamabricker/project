import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import FullRegisteration from "./components/FullRegisteration"
import Home from "./components/Home";
import Albums from "./components/Albums";
import Album from "./components/Album";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Todos from "./components/Todos";
import HomeLayout from "./components/HomeLayout";
import Aa from "./components/Aa";
export const currentUserProvider = createContext(null);

function App() {
const [currentUser,setCurrentUser]=useState({});

  return (
    <>

      <BrowserRouter>
        <Routes>
          <currentUser.Provider value={{currentUser, setCurrentUser}}>
            <Route path="/" element={<Aa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="fullRegisteration" element={<FullRegisteration />} /> */}
            {/* </Route> */}
            <Route path="home/users/:id" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="albums" element={<Albums />} />
              <Route path="albums/:id" element={<Album />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<Post />} />
              <Route path="todos" element={<Todos />} />
            </Route>
          </currentUser.Provider>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
