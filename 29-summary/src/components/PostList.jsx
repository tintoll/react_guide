import NewPost from "./NewPost";
import Post from "./Post";
import { useEffect, useState } from "react";
import classes from "./PostList.module.css";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  console.log("aa");
  useEffect(() => {
    // async를 사용하기 위해서 함수를 만들었음.
    async function fetchPost() {
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
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
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}

      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}
