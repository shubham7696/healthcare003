import { Card } from "react-bootstrap";
import moment from "moment"; // for date/time manipulation
import Appointment from "../interface/Appointment";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onClick }) => {
  const getStatusColor = (): string => {
    const now = moment();
    const appointmentTime = moment(appointment.date + " " + appointment.time);

    const diffInMinutes = moment.duration(appointmentTime.diff(now)).asMinutes();

     if (appointment.status === "cancelled") {
      return "red"; // Cancelled appointment
    } else if (diffInMinutes < 0) {
      return "red"; // Time has passed
    } else if (diffInMinutes < 10) {
      return "blue"; // Less than 10 mins left
    } else if (diffInMinutes > 10) {
      return "green"; // More than 10 mins left
    } else {
      return "orange"; // Default color
    }
  };

 const getStatusText = (): string => {
   const diffInMinutes = moment
     .duration(moment().diff(moment(`${appointment.date} ${appointment.time}`)))
     .asMinutes();

   if (appointment.status === "cancelled") {
     return "CANCELLED"; // Cancelled appointment
   } else if (diffInMinutes < 0) {
     return "Upcoming";
   } else if (diffInMinutes === 0) {
     return "Ongoing";
   } else {
     return "Past";
   }
 };

  const borderColor = getStatusColor();

  return (
    <Card border={borderColor} style={{ marginBottom: "10px" }} onClick={onClick}>
      {" "}
      {/* Add onClick handler */}
      <Card.Body>
        <Card.Title>{appointment.title || "Appointment"}</Card.Title>
        <Card.Text>
          <p>Patient: {appointment.patient.fullName}</p>
          <p>Doctor: {appointment.doctor}</p>
          <p>Date: {moment(appointment.date).format("DD-MM-YYYY")}</p>
          <p>Time: {appointment.time}</p>
          {getStatusText() !== "Past" && <p>Status: {getStatusText()}</p>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


export default AppointmentCard;