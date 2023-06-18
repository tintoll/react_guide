import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";
export default function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate(".."); // 한단계 위로 올라가라
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}
