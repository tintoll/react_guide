import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const isAuthuticated = useSelector((state) => state.auth.isAuthuticated);
  return (
    <>
      <Header />
      {!isAuthuticated && <Auth />}
      {isAuthuticated && <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
