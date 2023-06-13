import NewPost from "./NewPost";
import Post from "./Post";
import { useState } from "react";
import classes from "./PostList.module.css";
import Modal from "./Modal";

export default function PostList() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [endteredBody, setEnteredBody] = useState("");
  const [endteredAuthor, setEnteredAuthor] = useState("");

  function hideModalHandler() {
    setModalIsVisible(false);
  }
  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      {modalIsVisible && (
        <Modal onClose={hideModalHandler}>
          <NewPost
            onChangeBody={changeBodyHandler}
            onChangeAuthor={changeAuthorHandler}
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
