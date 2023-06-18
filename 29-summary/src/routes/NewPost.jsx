import { useState } from "react";
import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

function NewPost({ onCancel, onAddPost }) {
  const [endteredBody, setEnteredBody] = useState("");
  const [endteredAuthor, setEnteredAuthor] = useState("");

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: endteredBody,
      author: endteredAuthor,
    };

    onAddPost(postData);
    onCancel();
  }
  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            required
            rows={3}
            onChange={changeAuthorHandler}
          />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={changeBodyHandler} />
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
