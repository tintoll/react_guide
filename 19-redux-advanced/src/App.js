import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();

  // cart에 대한 정보를 리덕스에서 가져오고 cart가 변경될때마다 백엔드로 저장해주면
  // 실제로는 리덕스 처리는 리덕스하고 비동기는 useEffect를 이용하여 처리할 수 있다.
  // 하지만 이것은 문제가 있다.
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          state: "pending",
          title: "Sending....",
          message: "Sending Cart data!",
        })
      );
      const response = await fetch("https:///cart", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("error");
      }

      dispatch(
        uiActions.showNotification({
          state: "success",
          title: "Success!",
          message: "Sendt Cart data successfuly",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          state: "error",
          title: "Error!",
          message: "Sent Cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
