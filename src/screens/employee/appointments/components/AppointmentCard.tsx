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

    console.log("appointment.status == ", appointment.status);
    console.log("diff in minutes == ", diffInMinutes);
     if (appointment.status === "cancelled") {
      console.log("color returned === red ");
      return "red"; // Cancelled appointment
    } else if (diffInMinutes < 0) {
      console.log("===color returned === red ")
      return "red"; // Time has passed
    } else if (diffInMinutes < 10) {
      console.log("===color returned === blue ");
      return "blue"; // Less than 10 mins left
    } else if (diffInMinutes > 10) {
      console.log("===color returned === green ");
      return "green"; // More than 10 mins left
    } else {
      console.log("===color returned === orange ");
      return "orange"; // Default color
    }
  };

 const getStatusText = (): string => {
   const diffInMinutes = moment
     .duration(moment().diff(moment(`${appointment.date} ${appointment.time}`)))
     .asMinutes();

   if (appointment.status === "cancelled") {
     return "Cancelled"; // Cancelled appointment
   } else if (diffInMinutes < 0) {
     return "Upcoming";
   } else if (diffInMinutes === 0) {
     return "Ongoing";
   } else {
     return "Unknown";
   }
 };

  const borderColor = getStatusColor();

  return (
    <Card style={{ marginBottom: "10px", borderColor, }} onClick={onClick}>
      {" "}
      {/* Add onClick handler */}
      <Card.Body>
        <Card.Title>{appointment.title || "Appointment"}</Card.Title>
        <Card.Text>
          <p>Patient: {appointment.patient.fullName}</p>
          <p>Doctor: {appointment.doctor}</p>
          <p>Date: {moment(appointment.date).format("DD-MM-YYYY")}</p>
          <p>Time: {appointment.time}</p>
          <p>Status: {getStatusText()}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


export default AppointmentCard;