import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Posts() {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const currentUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  const postsElements = posts.map((post, index) => (
    <div key={post.id} className="post-item">
      <Link
        to={`/home/users/:id/posts/${post.id}`}
        aria-label={`View post about ${post.title}`}
      >
        <span>{index + 1}</span> {/* Displaying the index (1-based) */}
        <h3>{post.title}</h3> {/* Displaying the title of the album */}
      </Link>
    </div>
  ));
  return <div className="posts">{postsElements}</div>;
  }
  
  export default Posts