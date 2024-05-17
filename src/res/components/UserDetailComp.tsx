import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useUserDetailsHook from "../hooks/UserDetailHook";

const UserDetails = () => {
  const { user, getUserDetails, logout } = useUserDetailsHook();

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container className="mt-4" style={{ borderBottom: "1px solid #ccc" }}>
      {user && (
        <Row className="justify-content-between">
          <Col xs="auto">
            <div>
              <p>{user.fullName}</p>
              <p>{user.email}</p>
            </div>
          </Col>

          <Col xs="auto" className="d-flex align-items-center">
            <Button onClick={logout}>Logout</Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UserDetails;
