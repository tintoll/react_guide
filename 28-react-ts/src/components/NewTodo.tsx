import { useContext, useRef } from "react";
import classes from "./NewTodo.module.css";
import { TodosContext } from "../store/todo-context";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  // useRef 정의시 정의되는 input태그의 타입을 정의해줘야한다.
  const todoInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // ? 가 자동으로 붙는데 그 이유는 ref가 연결이 되어있는지 알 수 없기 때문이다.
    // ! 를 븉여서 절대 null 일수 없다고 해줘야 todoText를 사용하는 곳에서 ? 가 붙지 않는다.
    const enteredText = todoInputRef.current!.value;
    if (enteredText.trim().length === 0) {
      return;
    }
    todosCtx.addTodo(enteredText);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
