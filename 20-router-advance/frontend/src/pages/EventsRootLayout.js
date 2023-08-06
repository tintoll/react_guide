import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventsRootLaout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLaout;
