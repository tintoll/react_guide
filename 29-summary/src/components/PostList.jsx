import NewPost from "./NewPost";
import Post from "./Post";
import { useState } from "react";
import classes from "./PostList.module.css";

export default function PostList() {
  const [endteredBody, setEnteredBody] = useState("");
  const [endteredAuthor, setEnteredAuthor] = useState("");

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      <NewPost
        onChangeBody={changeBodyHandler}
        onChangeAuthor={changeAuthorHandler}
      />
      <ul className={classes.posts}>
        <Post author={endteredAuthor} body={endteredBody} />
        <Post author="Hani" body="Vue" />
      </ul>
    </>
  );
}
