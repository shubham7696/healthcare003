import React from "react";
import "../../assets/styles/AppStyles.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {

  const submitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center 100-w 100vh bg-primary"
      style={{
        backgroundImage: `url("https://mcr.health/wp-content/uploads/2021/03/If-You-Cant-Get-a-Doctors-Appointment.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="40-w p-5 rounded blur-bg form_container">
        <Form className="need-validation" onSubmit={submitForm}>
          <h2>Register</h2>
          <Form.Group className="mb-3">
            <Form.Label >Full Name</Form.Label>
            <Form.Control type="name" placeholder="Name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" required/>
          </Form.Group>
          <Button className="btn btn-primary w-100 mb-4" variant="primary" type="submit">
            Register
          </Button>
          <p className="text-right">
            Already have account ? <Link to={"/register"}>Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
