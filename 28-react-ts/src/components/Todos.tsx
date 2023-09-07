// props에 대한 타입을 정의하면 아래와 같이 React.FC로 타입일 설정해줘야한다.

import Todo from "../models/todo";

// 추가되는 props가 있는 경우에는 <{}> 안에 정의해주면 된다.
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export default Todos;
