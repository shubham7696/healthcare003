// Layout.js
import { Outlet } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import AppSideMenu from "../../res/components/AppSideMenu";
import UserDetails from "../../res/components/UserDetailComp";

const AdminLayout = () => {
  return (
    <Row>
      {/* Side menu on the left */}
      <Col md={3}>
        <AppSideMenu />
      </Col>
      {/* Main content on the right */}
      <Col md={9}>
        <UserDetails />
        <Outlet />
      </Col>
    </Row>
  );
};

export default AdminLayout;
