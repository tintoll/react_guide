import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      // enteredFilter의 값은 클로저 때문에 setTimeout이 발생하기 전의 값이기 때문에
      // ref를 이용한 값이랑 비교를 한다.
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-test-hooks-3ab7a-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((res) => res.json())
          .then((redData) => {
            const loadedIngredients = [];
            for (const key in redData) {
              loadedIngredients.push({
                id: key,
                title: redData[key].title,
                amount: redData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
      // 클린업 함수 useEffect()가 다시 실행되기 이전에 실행됨.
      return () => {
        clearTimeout(timer);
      };
    }, 500);
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
