
import { Route, Routes, createBrowserRouter } from "react-router-dom"
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import AuthLayout from "../../screens/auth/AuthLayout";
import AdminLayout from "../../screens/admin/AdminLayout";


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
      <Route path="/AdminPage" element={<AdminLayout />}>
        
      </Route>
    </Routes>
  );
}

export default AppRoutes;