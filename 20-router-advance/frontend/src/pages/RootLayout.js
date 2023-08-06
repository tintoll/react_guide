import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLaout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default RootLaout;
