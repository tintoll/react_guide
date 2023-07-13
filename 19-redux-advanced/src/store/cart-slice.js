import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// 여기에 정의해주면 자동으로 action 생성자로 등록된다.
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        state: "pending",
        title: "Sending....",
        message: "Sending Cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("https://test/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("error");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          state: "success",
          title: "Success!",
          message: "Sendt Cart data successfuly",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          state: "error",
          title: "Error!",
          message: "Sent Cart data failed",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
