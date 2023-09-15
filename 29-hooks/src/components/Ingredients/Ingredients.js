import React, { useCallback, useEffect, useReducer, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Shoud not get there!");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
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
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((resData) => {
        // setIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: resData.name, ...ingredient },
        // ]);
        dispatch({
          type: "ADD",
          ingredient: { id: resData.name, ...ingredient },
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  // 이 함수는 새로 생성이 되니 자식컴포넌트에서는 새로운걸로 판단되 리렌더링이 된다.
  // uesCallback을 하면 캐싱을 하기 때문에 함수가 새로 생성되지 않는다.
  const fileteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://react-test-hooks-3ab7a-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        setIsLoading(false);
        // setIngredients((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== id)
        // );
        dispatch({ type: "DELETE", id });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIgredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadIngredients={fileteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
