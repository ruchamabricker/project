import { useState, useEffect } from "react";
import Post from "../components/Post";
import PostDetail from "../components/PostDetail";
import { useServer } from "../components/Server";

function Posts() {
  const { currentUser, updateDataOnServer, fetchData } = useServer();

  const [postInRead, setPostInRead] = useState(false);
  const [postInReadDetails, setPostInReadDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: currentUser.id,
  });
  const [searchCriteria, setSearchCriteria] = useState({ id: "", title: "" });
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    fetchData("posts", "userId", currentUser.id, setPosts);
  }, []);

  function addNewPost() {
    setAddPost((prevAddPost) => !prevAddPost);
  }

  function handleSaveNewPost(e) {
    updateDataOnServer("posts", newPost, "POST", setPosts);
    setNewPost({ title: "", body: "", userId: currentUser.id });
    setAddPost(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewPost((prevNewPost) => ({ ...prevNewPost, [name]: value }));
  }

  function handleSearch() {
    const filteredPosts = posts.filter((post) => {
      return (
        post.id.toString().includes(searchCriteria.id) &&
        post.title.includes(searchCriteria.title)
      );
    });

    setSearchedPosts(filteredPosts);
  }

  useEffect(() => {
    handleSearch();
  }, [searchCriteria, posts]);

  return (
    <>
      <h1>Posts</h1>

      {postInRead ? (
        <>
          <PostDetail
            {...postInReadDetails}
            setPosts={setPosts}
            setPostInRead={setPostInRead}
          />
        </>
      ) : (
        <div className="posts">
          <input
            name="id"
            placeholder="Search by ID"
            value={searchCriteria.id}
            onChange={(e) =>
              setSearchCriteria((prevSearchCriteria) => ({
                ...prevSearchCriteria,
                id: e.target.value,
              }))
            }
          ></input>
          <input
            name="title"
            placeholder="Search by Title"
            value={searchCriteria.title}
            onChange={(e) =>
              setSearchCriteria((prevSearchCriteria) => ({
                ...prevSearchCriteria,
                title: e.target.value,
              }))
            }
          ></input>
          {addPost && (
            <div>
              <input
                placeholder="title"
                name="title"
                onChange={handleInputChange}
                value={newPost.title}
              ></input>
              <input
                placeholder="body"
                name="body"
                onChange={handleInputChange}
                value={newPost.body}
              ></input>
              <button onClick={handleSaveNewPost}>Save</button>
            </div>
          )}
          <div>
            <br></br>
            <button onClick={addNewPost}>Add Post</button>
          </div>
          {searchedPosts.map((post) => (
            <Post
              key={post.id}
              {...post}
              setPostInRead={setPostInRead}
              setPostInReadDetails={setPostInReadDetails}
              setPosts={setPosts}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default Posts;
