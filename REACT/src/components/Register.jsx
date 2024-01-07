import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullRegisteration from "./FullRegisteration";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [isFullRegisteration, setIsFullRegisteration] = useState(false);

  // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
  // פונקציה להתמודדות עם שליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password };
    // יש לבדוק שהמשתמש עם שם המשתמש אינו קיים כבר
    if (checkUser(newUser)) {
      alert("משתמש כבר קיים במערכת");
    } else if (password !== passwordVerify) {
      alert("אימות סיסמא לא תואם")
    }
    else {
      // הוספת המשתמש למערך (או למקום אחר במערכת)
      alert("נרשמת בהצלחה!");
      setIsFullRegisteration(true);
      // navigate('/fullRegisteration')
    }
  };

  // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
  const checkUser = (user) => {
    const dataBase = `http://localhost:3000/users?username=${username}`;
    fetch(dataBase)
      .then(res => res.json())
      .then(users => {
        if (users.length === 0) {
          localStorage.setItem("user", JSON.stringify({ userName: user.username }));
          return true;
        }
        else {
          return false;
        }
      })
  };

  return (
    !isFullRegisteration ?
      (
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
            <button type="submit">Register</button>
            <Link to="/login">Already have an account? Login now!</Link>
          </form>
        </div>) : (
        <div>
          <FullRegisteration password={password} userName={username}/>
        </div>)
  );
}

export default Register;
