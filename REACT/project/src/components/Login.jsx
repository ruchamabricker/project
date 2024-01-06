import { useState, useEffect } from "react";
import "./Login.css";
// import { Link } from "react-router-dom"
import { Routes, Route, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [correctDetails, setCorrectDetails] = useState(false);
    const [existingUser, setExistingUser] = useState({});
    // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
    // פונקציה להתמודדות עם שליחת הטופס
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // התחברות - כאן יש לבדוק שהמשתמש קיים והסיסמה נכונה
    //     setExistingUser({ username, password });
    //     const dataBase = `http://localhost:3000/users?username=${existingUser.username}`;
    //     fetch(dataBase)
    //         .then(res => res.json())
    //         .then(users => {
    //             console.log(users);
    //             const foundUser = users.find(u => u.website === existingUser.password);
    //             console.log(foundUser);
    //             console.log(foundUser != null);
    //             if (foundUser) {
    //                 setCorrectDetails(true);
    //                 localStorage.setItem("user", JSON.stringify(existingUser));
    //                 alert("התחברת בהצלחה!");
    //             } else {
    //                 alert("שם המשתמש או הסיסמה אינם נכונים");
    //             }
    //         })
    //     };
    const handleSubmit=(e)=> {
        e.preventDefault();     
           setExistingUser({ username, password });
    }

    useEffect(() => {
        const users = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users?username=${existingUser.username}`);
                const listUsers = await response.json();
                console.log(listUsers)
                findUser(listUsers)
            }
            catch (err) {

            }

        }
        users();
    }, [existingUser])

    function findUser(usersByName) {
        console.log(usersByName)
        const foundUser = usersByName.find(u => u.website === existingUser.password);
        console.log(foundUser);
        console.log(foundUser != null);
        if (foundUser) {
            setCorrectDetails(true);
            localStorage.setItem("user", JSON.stringify(existingUser));
        }
    }


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
                <br />{console.log(correctDetails)}
                {/* <Link  to={correctDetails ? "/home" : "/login"}> */}
                <Link  to= "/home">

                    <button type="submit" onClick={handleSubmit}>Log in</button>
                </Link>
            </form>
            <Link to="/register"> Do not have an account? Register now!</Link>
        </div>
    );
}

export default Login;
