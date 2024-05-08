
import { Route, Routes, createBrowserRouter } from "react-router-dom"
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";


// Router singleton created
const AppRoutes = createBrowserRouter([{ path: "*", element: <Root /> }]);

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/resetPassword/*" element={<ResetPassword />} /> */}
    </Routes>
  );
}

export default AppRoutes;