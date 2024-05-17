// SideMenu.js
import React, { useEffect } from 'react';
import { Container, Col, Navbar, Nav } from 'react-bootstrap';
import useSideMenuHook from '../hooks/SideMenuHook'; // Import the custom hook
import '../../assets/styles/SideMenu.css'; // Import your custom CSS file
import logoImg from "../../assets/icons/logo.jpg";
import { Link, useLocation } from 'react-router-dom';

const AppSideMenu = () => { // Accept userType as a prop
  const { menuOptions, updateMenuOptions } = useSideMenuHook();

  const location = useLocation();
  
  // Update menu options based on user type when userType prop changes
  useEffect(() => {
    updateMenuOptions(localStorage.getItem("userType"));
  }, []);

  return (
    <Container fluid>
      <Col md={3} className="side-menu">
        <Navbar expand="lg">
          {/* <Navbar.Brand href="#">
            <img
              src={logoImg}
              alt="Logo"
              width="50" // Adjust width as needed
              height="50" // Adjust height as needed
              className="d-inline-block align-top"
            />
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
              {menuOptions.map(
                (option) =>
                  option.visible && (
                    <Nav.Link
                      key={option.label}
                      as={Link}
                      to={option.path}
                      className={option.path === location.pathname ? "active" : ""}
                    >
                      {option.label}
                    </Nav.Link>
                  )
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Container>
  );
};

export default AppSideMenu;
