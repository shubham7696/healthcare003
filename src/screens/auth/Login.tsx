import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/AppStyles.css";
import { Link, useNavigate } from "react-router-dom";
import useApiReqHook from "../../res/hooks/ApiRequestHook";
import Loader from "../../res/components/LoaderComp";
import AlertMsgComp from "../../res/components/AlertMsgComp";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, data, fetchData } = useApiReqHook(); // Use the custom hook

  // need to discuss this one
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (values: {
    target: HTMLFormElement | undefined;
    preventDefault: () => void;
  }) => {
    values.preventDefault();

    const formData = new FormData(values.target);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);
    try {
      fetchData("api/v1/employee/login", "post", payload);
    } catch (error) {
      console.log(`Registered failure ${error}`);
    }
  };

  // Handle success and error states
  if (data && data.success) {
    console.log("Login successfully qwerty",data);
    // save token in local storage.
    localStorage.setItem("token", data.token)
    // navigate to home page depending on  user type
    navigate("/AdminPage");
  }
  if (error) {
    console.log("Login failure", error);
  }

  return (
    <div className="40-w p-5 rounded blur-bg form_container">
      <Form className="need-validation" onSubmit={submitForm}>
        <h2>Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter Email" required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            required
          />
          {/* <i onClick={togglePasswordVisibility}>{eye}</i>{" "} */}
        </Form.Group>
        <Form.Group className="mb-3 ms-0 form-check">
          <Form.Check type="checkbox" label="Remember Me" id="check" />
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
            Login
          </Button>
        )}
        <p className="text-right">
          Forgot <Link to={"/resetPassword"}> Password ?</Link> OR{" "}
          <Link to={"/register"}>Register</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
