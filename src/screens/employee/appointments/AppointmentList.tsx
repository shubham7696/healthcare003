import React, { useState, useEffect } from "react";
import { Col, Row, Card, Modal, Form, Button } from "react-bootstrap";
import Appointment from "./interface/Appointment";
import AppointmentCard from "./components/AppointmentCard";
import useApiReqHook from "../../../res/hooks/ApiRequestHook";
import ApiResponse from "../../../base/network/ApiResponse";
import AppointmentFilter from "./components/AppointmentFiltersComp";

function AppointmentList() {
  const [gridColumns, setGridColumns] = useState<number>(3); // Adjust for desired initial columns
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { loading, error, data, fetchData } = useApiReqHook();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null); // State to manage selected appointment
  const [showModal, setShowModal] = useState<boolean>(false); // State to manage modal visibility
  // use this to change status of appointment
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setGridColumns(1); // 1 column for mobile
      } else {
        setGridColumns(3); // 2 columns for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const fetchAppointments = async (params: { phone?: string; email?: string; date?: string }) => {
    try {
      let url = "api/v1/appointments/getAllAppointment?";

      if (params.phone) {
        url = url + `&phone=${params.phone}`;
      }
      if (params.email) {
        url = url + `&email=${params.email}`;
      }
      if (params.date) {
        url = url + `&date=${params.date}`;
      }

      fetchData(url, "get"); // Assuming a GET request
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments({});
  }, []);

  useEffect(() => {
    if (data && data.success) {
      setAppointments(data.data); // Update appointments state with fetched data
    }

    if (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [data, error]);

  const handleCardClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment); // Set selected appointment
    setNewStatus(appointment.status);
    setShowModal(true); // Show modal
  };

  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      fetchAppointments({ phone: query, email: query });
    } else {
      fetchAppointments({});
    }
  };

  const handleDateChange = (date: string) => {
    fetchAppointments({ date });
  };

  // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setNewStatus(event.target.value);
  // };

  // const handleSaveStatus = async () => {
  //   if (selectedAppointment) {
  //     try {
  //       const response = await fetch(`/api/v1/appointments/${selectedAppointment._id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ status: newStatus }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to update appointment status");
  //       }

  //       const updatedAppointment = await response.json();
  //       setAppointments((prevAppointments) =>
  //         prevAppointments.map((appointment) =>
  //           appointment._id === updatedAppointment.data._id ? updatedAppointment.data : appointment
  //         )
  //       );
  //       setShowModal(false); // Close modal after saving
  //     } catch (error) {
  //       console.error("Error updating appointment status:", error);
  //     }
  //   }
  // };


  return (
    <>
      <AppointmentFilter onSearch={handleSearch} onDateChange={handleDateChange} />
      <Row xs={1} md={gridColumns}>
        {" "}
        {appointments.map((appointment) => (
          <Col key={appointment._id}>
            <AppointmentCard
              appointment={appointment}
              onClick={() => handleCardClick(appointment)}
            />
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>Patient: {selectedAppointment.patient.fullName}</p>
              <p>Doctor: {selectedAppointment.doctor}</p>
              <p>Date: {selectedAppointment.date}</p>
              <p>Time: {selectedAppointment.time}</p>
              <p>Reason: {selectedAppointment.reason}</p>
              <p>Status: {selectedAppointment.status}</p>
              <p>Notes: {selectedAppointment.notes}</p>
              {/* <Form.Group controlId="statusSelect">
                <Form.Label>Change Status</Form.Label>
                <Form.Control as="select" value={newStatus} onChange={() => handleStatusChange}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group> */}
            </>
          )}
        {/* </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveStatus}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default AppointmentList;
