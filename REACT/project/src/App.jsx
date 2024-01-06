import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Albums from "./components/Albums";
import Album from "./components/Album";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Todos from "./components/Todos";
import HomeLayout from "./components/HomeLayout";
import Aa from "./components/Aa";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Aa />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="home/users/:id" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route>
              <Route path="albums" element={<Albums />} />
              <Route path="albums/:id" element={<Album />} />
            </Route>
            <Route>
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<Post />} />
            </Route>
            <Route path="todos" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
