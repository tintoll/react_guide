import React, { useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  // 리렌더링 될 때마다 실행 된다, 두번째 인자가 의존하는 값이 변경이 되면 실행된다.
  // 아래 문장에는 외부 의존하는 값이 없다. setIngredients는 변경되지 않는 것이다
  useEffect(() => {
    fetch(
      "https://react-test-hooks-3ab7a-default-rtdb.firebaseio.com/ingredients.json"
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
        setIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://react-test-hooks-3ab7a-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: resData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };
  return (
    <div className="App">
      <IngredientForm onAddIgredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
