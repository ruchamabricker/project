import { useState } from "react";
import { Link } from "react-router-dom";
import FullRegistration from "../components/FullRegistration";
import { useServer } from "../components/Server";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [isFullRegistration, setIsFullRegistration] = useState(false);
  const { currentUser, setCurrentUser, updateDataOnServer } = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataBase = `http://localhost:3000/users?username=${username}`;
    fetch(dataBase)
      .then((res) => res.json())
      .then(async (users) => {
        if (
          users.length === 0 &&
          password == passwordVerify &&
          username != "" &&
          password != "" &&
          passwordVerify != ""
        ) {
          updateDataOnServer(
            "users",
            { ...currentUser, username: username, website: password },
            "POST",
            setCurrentUser
          );
          setCurrentUser(currentUser);
          setIsFullRegistration(true);
        } else if (users.length === 0) {
          alert("Password verification does not match");
        } else {
          alert("Username already exist");
        }
      });
  };

  return !isFullRegistration ? (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          verify-password
          <input
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>{" "}
      <Link to="/login">Already have an account? Login now!</Link>
    </div>
  ) : (
    <FullRegistration
      id={currentUser.id}
      username={username}
      password={password}
    />
  );
}
export default Register;
