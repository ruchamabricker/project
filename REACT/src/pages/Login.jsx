import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useServer } from "../components/Server";

function Login() {
  const { setCurrentUser } = useServer();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Bret");
  const [password, setPassword] = useState("hildegard.org");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataBase = `http://localhost:3000/users?username=${username}`;
    fetch(dataBase)
      .then((res) => res.json())
      .then((users) => {
        const foundUser = users.find((u) => u.website === password);
        if (foundUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({ id: foundUser.id, userName: username })
          );
          alert("You have connected successfully!");
          setCurrentUser(foundUser);
          navigate(`/home`);
        } else {
          alert("The username or password is incorrect");
        }
      });
  };

  return (
    <div className="container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          user name
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          {" "}
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>
      <Link to="/register"> Don't have an account? Register now!</Link>
    </div>
  );
}

export default Login;
