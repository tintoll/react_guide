import NewPost from "./NewPost";
import Post from "./Post";
import { useState } from "react";
import classes from "./PostList.module.css";
import Modal from "./Modal";

export default function PostList({ isPosting, onStopPosting }) {
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
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onChangeBody={changeBodyHandler}
            onChangeAuthor={changeAuthorHandler}
            onCancel={onStopPosting}
          />
        </Modal>
      )}

      <ul className={classes.posts}>
        <Post author={endteredAuthor} body={endteredBody} />
        <Post author="Hani" body="Vue" />
      </ul>
    </>
  );
}
