import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Post() {
  const params = useParams();
  const [post, setPost] = useState(null);
  console.log(params);
//לשים לב שהוא מביא שוב דברים שהוא לא צריך להביא
  useEffect(() => {
    fetch(`http://localhost:3000/posts?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [params.id]);
  return (
    <div className="post-detail-container">
      {post ? (
        <div className="post-detail">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Post;
