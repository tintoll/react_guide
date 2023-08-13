import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData("evnet-datail");
  return <EventForm event={data.event} method="PATCH" />;
}

export default EditEventPage;
