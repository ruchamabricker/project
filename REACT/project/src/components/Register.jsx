import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
  // פונקציה להתמודדות עם שליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { username, password };
    // יש לבדוק שהמשתמש עם שם המשתמש אינו קיים כבר
    if (checkUser(newUser)) {
      alert("משתמש כבר קיים במערכת");
    } else {
      // הוספת המשתמש למערך (או למקום אחר במערכת)

      alert("נרשמת בהצלחה!");
    }
  };

  // פונקציה לבדיקת קיום משתמש במערכת (בדוגמה נבדוק נגד מערך פשוט)
  const checkUser = (user) => {
    // בדוגמה זו, המשתמשים מאוחסנים במערך users
    // ניתן להשתמש בדרכים יותר מתקדמות לאחסון ובדיקת משתמשים
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(
      (u) => u.username === user.username && u.password === user.password
    );
  };

  // פונקציה להוספת משתמש למערכת (בדוגמה נוסיף למערך פשוט)
  const addUser = (user) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <Link to="/login">Already have an account? Login now!</Link>
      </form>
    </div>
  );
}

export default Register;
