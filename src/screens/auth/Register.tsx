import React from "react";
import "../../assets/styles/AppStyles.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useApiReqHook from "../../res/hooks/ApiRequestHook";
import AlertMsgComp from "../../res/components/AlertMsgComp";
import Loader from "../../res/components/LoaderComp";

function Register() {
  const navigate = useNavigate();

  const { loading, error, data, fetchData } = useApiReqHook(); // Use the custom hook

  // Handle form submission logic here
  const submitForm = async (values: {
    target: HTMLFormElement | undefined;
    preventDefault: () => void;
  }) => {
    values.preventDefault();

    const formData = new FormData(values.target);
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);

    try {
      fetchData("api/v1/employee/register", "post", payload);
    } catch (error) {
      console.log(`Registered failure ${error}`);
    }
  };

  // Handle success and error states
  if (data && data.success) {
    console.log("Login successfully qwerty");
    navigate("/register");
  }
  if (error) {
    console.log("Login failure", error);
  }

  return (
    <div className="40-w p-5 rounded blur-bg form_container">
      <Form className="need-validation" onSubmit={submitForm}>
        <h2>Register</h2>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="fullName" placeholder="Name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email" required />
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
        {/* Show loader if loading */}
        {loading ? (
          <Loader />
        ) : (
          <Button className="btn btn-primary w-100 mb-4" variant="primary" type="submit">
            Register
          </Button>
        )}
        <p className="text-right">
          Already have account ? <Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
