import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://tt/cart.json");
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
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
      const response = await fetch("https://tt/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
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
