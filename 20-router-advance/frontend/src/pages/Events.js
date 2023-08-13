import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // 여기에 에러관련 내용을 넘기자
    // return {isError:true, message: "Could not fetch events."};
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    // Response를 간편하게 설정할수 있게 해주는 json Util함수
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loaderEvents(),
  });
}
