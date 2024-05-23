import React, { useEffect, useState } from "react";
import "../../assets/styles/AppStyles.css";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useApiReqHook from "../../res/hooks/ApiRequestHook";
import AlertMsgComp from "../../res/components/AlertMsgComp";
import BlurBgLoader from "../../res/components/BlurBgLoaderComp";

function UpdateEmployee() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, data, fetchData } = useApiReqHook(); // Use the custom hook

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  useEffect(() => {
    if (location.state) {
      const { fullName, email } = location.state; // Assuming you're passing fullName and email in location.state
      setFormData({ ...formData, fullName, email });
    }
  }, []);

  // Handle form submission logic here
  const submitForm = async (values: {
    target: HTMLFormElement | undefined;
    preventDefault: () => void;
  }) => {
    values.preventDefault();

    const payload = {
      ...formData,
      employeeId: location.state._id,
    };

    try {
      fetchData("api/v1/employee/updateEmp", "post", payload);
    } catch (error) {
      console.log(`Update failure ${error}`);
    }
  };

  // Handle success and error states
  if (data && data.success) {
    console.log("update successfully qwerty");
    navigate("/empList");
  }
  if (error) {
    console.log("emp update failure", error);
  }

  return (
    <div className="position-relative p-4 blur-bg ">
      {loading && <BlurBgLoader />}
      <Form className="need-validation" onSubmit={submitForm}>
        <h2>Update Employee</h2>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter Password" required />
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
          Update Employee
        </Button>
        {/* Show loader if loading */}
      </Form>
    </div>
  );
}

export default UpdateEmployee;
