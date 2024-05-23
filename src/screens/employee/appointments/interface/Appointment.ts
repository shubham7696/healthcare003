interface Appointment {
  _id: string; // Assuming an ID for each appointment
  title?: string; // Optional title
  doctor: string;
  date: string;
  time: string;
  status?: "cancelled" | "incomplete" | "other"; // Optional status
}

export default Appointment;