import "./Header.css";
import { Link } from "react-router-dom"

export default function Header() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <header>
            {/* <Link className="site-logo" to="/">#VanLife</Link> */}
            <nav>
                <Link to="/login">Logout</Link>
                <Link to={`/home/users/${currentUser.id}/albums`}>Albums</Link>
                <Link to={`/home/users/${currentUser.id}/posts`}>Posts</Link>
                <Link to={`/home/users/${currentUser.id}/todos`}>Todos</Link>
                <Link to={`/home/users/${currentUser.id}/info`}>Info</Link>
            </nav>
        </header>
    )
}