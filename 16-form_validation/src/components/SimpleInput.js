import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const nameInputRef = useRef();

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);
    console.log(enteredName);
    console.log(nameInputRef.current.value);

    // nameInputRef.current.value = ''; // Dom에 직접 접근하는 것이기 때문에 사용하지 말자
    setEnteredName("");
  };

  const nameInputClass = enteredNameIsValid
    ? "form-control "
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          onChange={nameInputHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && <p className="error-text">Must not empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
