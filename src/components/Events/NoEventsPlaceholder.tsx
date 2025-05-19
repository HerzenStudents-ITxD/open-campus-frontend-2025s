import { Button } from "react-bootstrap";
//import "./NoEventsPlaceholder.css";
import "../../styles/Events.css";

export default function NoEventsPlaceholder() {
  return (
    <div className="no-events">
      <p>Упс! На данный момент мероприятия не запланированы...</p>
      <p>Но вы можете подать заявку на бронь помещения!</p>
      <Button variant="dark">Локации</Button>
    </div>
  );
}
