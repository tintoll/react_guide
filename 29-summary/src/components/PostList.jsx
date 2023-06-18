import Post from "./Post";
import { useEffect, useState } from "react";
import classes from "./PostList.module.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // async를 사용하기 위해서 함수를 만들었음.
    async function fetchPost() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fetchPost();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/post", {
      method: "POST",
      body: postData,
      headers: {
        "Content-type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }
  return (
    <>
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}

      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading post ....</p>
        </div>
      )}
    </>
  );
}
