import React, { useState, useEffect } from "react";
import { Col, Row, Card, Modal } from "react-bootstrap";
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
      fetchAppointments({date});
  };

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
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AppointmentList;
