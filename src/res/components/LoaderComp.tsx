import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader d-flex justify-content-center mb-4">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
