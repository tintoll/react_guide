import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "e1", title: "some Event" },
  { id: "e2", title: "another Event" },
];

function EventsPage() {
  return (
    <>
      <h1> Events page</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
