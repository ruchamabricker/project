import { Link, useNavigate } from "react-router-dom";
import { useServer } from "./Server";

function Header() {
  const { currentUser, setCurrentUser } = useServer();
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <button
          onClick={() => {
            localStorage.clear();
            setCurrentUser({});
            navigate("/login");
          }}
        >
          Logout
        </button>

        <Link to={`/home/users/${currentUser.id}/albums`}>Albums</Link>
        <Link to={`/home/users/${currentUser.id}/posts`}>Posts</Link>
        <Link to={`/home/users/${currentUser.id}/todos`}>Todos</Link>
        <Link to={`/home/users/${currentUser.id}`}>Info</Link>
      </nav>
    </header>
  );
}
export default Header;
