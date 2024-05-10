// Layout.js
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useApiReqHook from "../../res/hooks/ApiRequestHook";
import { useEffect } from "react";

const AdminLayout = () => {
  const { loading, error, data, fetchData } = useApiReqHook();
  // api call to get employee data.
  const getEmpData = () => {
    try {
      fetchData("api/v1/employee/getEmpData", "post");
    } catch (error) {
      console.log(error);
    }
  };
  // Handle success and error states
  if (data && data.success) {
    console.log("Login successfully qwerty", data);
    // save token in local storage.
    localStorage.setItem("token", data.token);
    // navigate to home page depending on  user type
    navigate("/AdminPage");
  }
  if (error) {
    console.log("Login failure", error);
  }


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getEmpData();
  }, []);

  //   const menuItems = userType === "admin" ? AdminSideMenu : PatientSideMenu;

  return (
    <div>
      <h1>Admin Layout</h1>
    </div>
    // <div className="main">
    //   <div className="layout">
    //     <div className="sidebar">
    //       <div className="logo">
    //         <h6>{userType === "admin" ? "Employees" : "Patients"}</h6>
    //       </div>
    //       <hr />
    //       <div className="menu">
    //         {menuItems.map((menu) => {
    //           const isActive = location.pathname === menu.path;
    //           return (
    //             <>
    //               <div className={`menu-item ${isActive && "active"}`}>
    //                 <i className={menu.icon}></i>
    //                 <Link to={menu.path}>{menu.name}</Link>
    //               </div>
    //             </>
    //           );
    //         })}
    //       </div>
    //     </div>
    //     <div className="content">
    //       <div className="header">
    //         {/* <h2>{useDisplayName()}</h2> */}
    //         <h2>{loggedUser.name}</h2>
    //         <button onClick={handleLogout} className="logout-button">
    //           Logout
    //         </button>
    //       </div>
    //       <div className="body">
    //         <Outlet />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminLayout;
