// @flow strict
import { Container } from "@mui/material";
import { EventType } from "../../../../types/armenia";
import EventDetailsMaps from "./event-maps";
import EventSpecification from "./event-specification";
import EventThumbnailSection from "./event-thumbnail";

interface PropsType {
  event: EventType,
  events: EventType[],
}

function EventDetailsUI({ event }: PropsType) {

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <EventThumbnailSection event={event} />
          <EventSpecification event={event} />
        </div>
        <EventDetailsMaps event={event} />
      </Container>
    </div>
  );
};

export default EventDetailsUI;