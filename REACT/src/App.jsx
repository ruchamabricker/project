import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Server from "./components/Server";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Album from "./pages/Album";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import HomeLayout from "./components/HomeLayout";
import Info from "./pages/Info";

function App() {
  return (
    <Server>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="users/:userId" element={<Info />} />
            <Route path="users/:userId/albums" element={<Albums />} />
            <Route path="users/:userId/albums/:albumId" element={<Album />} />
            <Route path="users/:userId/posts" element={<Posts />} />
            <Route path="users/:userId/posts/:id" element={<Posts />} />
            <Route path="users/:userId/todos" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Server>
  );
}

export default App;
