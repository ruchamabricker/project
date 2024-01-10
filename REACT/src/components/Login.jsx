import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate, Link } from 'react-router-dom';
import { currentUserProvider }from '../App'

function Login() {
const {currentUser, SetcurrentUser}= useContext(currentUserProvider)
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
    // פונקציה להתמודדות עם שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault();
        // התחברות - כאן יש לבדוק שהמשתמש קיים והסיסמה נכונה
        const dataBase = `http://localhost:3000/users?username=${username}`;
        fetch(dataBase)
            .then(res => res.json())
            .then(users => {
                const foundUser = users.find(u => u.website === password);
                if (foundUser) {
                    localStorage.setItem("user", JSON.stringify({ id: foundUser.id, userName: username }));
                    alert("התחברת בהצלחה!");
                    SetcurrentUser(foundUser);
                    console.log("current user" + currentUser);
                    navigate(`/home/users/${foundUser.id}`);
                } else {
                    alert("שם המשתמש או הסיסמה אינם נכונים");
                }
            })
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
                <label> password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={handleSubmit}>Log in</button>
            </form>
            <Link to="/register"> Do not have an account? Register now!</Link>
        </div>
    );
}

export default Login;
