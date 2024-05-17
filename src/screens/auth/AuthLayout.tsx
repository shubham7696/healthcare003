// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center 100-w 100vh bg-primary"
      style={{
        backgroundImage: `url("https://mcr.health/wp-content/uploads/2021/03/If-You-Cant-Get-a-Doctors-Appointment.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
