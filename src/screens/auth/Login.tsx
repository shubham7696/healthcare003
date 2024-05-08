import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/AppStyles.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);

  // need to discuss this one
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <h2>Login</h2>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
            />
            {/* <i onClick={togglePasswordVisibility}>{eye}</i>{" "} */}
          </Form.Group>
          <Form.Group className="mb-3 ms-0 form-check">
            <Form.Check type="checkbox" label="Remember Me" id="check" />
          </Form.Group>
          <Button className="btn btn-primary w-100 mb-4" variant="primary" type="submit">
            Login
          </Button>
          <p className="text-right">
            Forgot <Link to={"/resetPassword"} > Password ?</Link> OR <Link to={"/register"} >Register</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
