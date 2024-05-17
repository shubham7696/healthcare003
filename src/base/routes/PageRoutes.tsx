
import { Route, Routes, createBrowserRouter } from "react-router-dom"
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import AuthLayout from "../../screens/auth/AuthLayout";
import AdminLayout from "../../screens/admin/AdminLayout";
import EmployeeList from "../../screens/admin/EmployeeList";
import AddEmployee from "../../screens/admin/AddEmployee";
import UpdateEmployee from "../../screens/admin/UpdateEmployee";
import PatientList from "../../screens/employee/patients/PatientsList";
import AddPatient from "../../screens/employee/patients/AddPatient";
import EmployeeLayout from "../../screens/employee/EmployeeLayout";
import UpdatePatient from "../../screens/employee/patients/UpdatePatient";


// Router singleton created
const AppRoutes = createBrowserRouter([{ path: "*", element: <Root /> }]);

function Root() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="/resetPassword/*" element={<ResetPassword />} /> */}
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/empList" element={<EmployeeList />} />
        <Route path="/addEmp" element={<AddEmployee />} />
        <Route path="/updateEmp" element={<UpdateEmployee />} />
      </Route>
      <Route element={<EmployeeLayout />}>
        <Route path="/patientList" element={<PatientList />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/updatePatient" element={<UpdatePatient />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;