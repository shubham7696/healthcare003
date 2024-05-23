import React, { useEffect, useState } from "react";
import "../../../assets/styles/AppStyles.css";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useApiReqHook from "../../../res/hooks/ApiRequestHook";
import AlertMsgComp from "../../../res/components/AlertMsgComp";
import BlurBgLoader from "../../../res/components/BlurBgLoaderComp";
import PatientSearch from "./components/PatientSearchComp";
import Patient from "./interface/Patient";

function AddAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, data, fetchData } = useApiReqHook(); // Use the custom hook

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    patientId: "",
    patientNumber: "",
    patientEmail: "",
    doctorId: "",
    date: "",
    time: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patientId: patient._id,
      patientNumber: patient.phoneNumber,
      patientEmail: patient.email,
    });
  };

  useEffect(() => {
    console.log("======= \n", "here for patient", "\n ========");
    if (location.state && location.state.patient) {
      const patient = location.state.patient;
      console.log("======= 22\n", patient, "\n 22 ========");

      setSelectedPatient(patient);
      setFormData({
        ...formData,
        patientId: patient._id,
        patientNumber: patient.phoneNumber,
        patientEmail: patient.email,
      });
    }
  }, [location.state]);

  // Handle form submission logic here
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { ...formData };
    console.log(payload);

    try {
      fetchData("api/v1/appointments/addNewAppointment", "post", payload);
    } catch (error) {
      console.log(`Failed to book appointment: ${error}`);
    }
  };

  // Handle success and error states
  if (data && data.success) {
    console.log("Appointment booked successfully");
    navigate("/allAppointment");
  }
  if (error) {
    console.log("Failed to book appointment", error);
  }

  return (
    <div className="position-relative p-4 blur-bg ">
      {loading && <BlurBgLoader />}
      <Form className="need-validation" onSubmit={submitForm}>
        <h2>Book Appointment</h2>
        <PatientSearch onPatientSelect={handlePatientSelect} initialPatient={selectedPatient}/>

        <Form.Group className="mb-3">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control
            type="text"
            name="doctorId"
            placeholder="Enter Doctor ID"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* show success error alerts  */}
        {/* Show error message if error exists */}
        {error && (
          <AlertMsgComp
            error={true}
            message={error.message}
            duration={3000}
            onDismiss={() => console.log("Dismissed")}
          />
        )}
        {/* Show success message if data exists and success */}
        {data && (
          <AlertMsgComp
            error={false}
            message={data.message}
            duration={3000}
            onDismiss={() => console.log("Dismissed")}
          />
        )}
        <Button className="btn btn-primary w-100 mb-4" variant="primary" type="submit">
          Book Appointment
        </Button>
        {/* Show loader if loading */}
      </Form>
    </div>
  );
}

export default AddAppointment;
