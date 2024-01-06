import "./Header.css";
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            {/* <Link className="site-logo" to="/">#VanLife</Link> */}
            <nav>
                <Link to="/login">Logout</Link>
                <Link to="/home/users/:id/albums">Albums</Link>
                <Link to="/home/users/:id/posts">Posts</Link>
                <Link to="/home/users/:id/todos">Todos</Link>
                <Link to="/home/users/:id/info">Info</Link>

            </nav>
        </header>
    )
}