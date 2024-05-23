import React, { useState } from "react";
import "../../../assets/styles/AppStyles.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useApiReqHook from "../../../res/hooks/ApiRequestHook";
import AlertMsgComp from "../../../res/components/AlertMsgComp";
import BlurBgLoader from "../../../res/components/BlurBgLoaderComp";

function AddPatient() {
  const navigate = useNavigate();

  const { loading, error, data, fetchData } = useApiReqHook(); // Use the custom hook

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
    description: "",
    bloodGroup: "",
    phoneNumber: "",
    department: "",
    doctor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle form submission logic here
  const submitForm = async (values: {
    target: HTMLFormElement | undefined;
    preventDefault: () => void;
  }) => {
    values.preventDefault();

    const payload = { ...formData };
    console.log(payload);

    try {
      fetchData("api/v1/patients/addNewPatient", "post", payload);
    } catch (error) {
      console.log(`Registered failure ${error}`);
    }
  };

  // Handle success and error states
  if (data && data.success) {
    console.log("added successfully qwerty");
    navigate("/patientList");
  }
  if (error) {
    console.log("emp adding failure", error);
  }

  return (
    <div className="position-relative p-4 blur-bg ">
      {loading && <BlurBgLoader />}
      <Form className="need-validation" onSubmit={submitForm}>
        <h2>Update Patient</h2>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="me-3">{"Gender   "}</Form.Label>
          <Form.Check
            inline
            label="Male"
            type="radio"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <Form.Check
            inline
            label="Female"
            type="radio"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <Form.Check
            inline
            label="Other"
            type="radio"
            name="gender"
            value="other"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
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
        <Form.Group className="mb-3">
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            type="text"
            name="bloodGroup"
            placeholder="Enter Blood Group"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter Department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Control
            as="select"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
          >
            <option value="">Select Doctor</option>
            {/* Add options for doctors */}
          </Form.Control>
        </Form.Group>
        {/* show success error alerts  */}
        {/* Show error message if error exists */}
        {error && (
          <AlertMsgComp
            error={true}
            message={error.message}
            duration={3000}
            onDismiss={() => {console.log("Dismissed")}}
          />
        )}
        {/* Show success message if data exists and success */}
        {/* this one is not working properly */}
        {data && (
          <AlertMsgComp
            error={false}
            message={data.message}
            duration={3000}
            onDismiss={() => console.log("Dismissed")}
          />
        )}
        <Button className="btn btn-primary w-100 mb-4" variant="primary" type="submit">
          Add Patient
        </Button>
        {/* Show loader if loading */}
      </Form>
    </div>
  );
}

export default AddPatient;
