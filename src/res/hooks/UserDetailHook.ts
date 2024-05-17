import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUserDetailsHook = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserDetails = () => {
    // Get user details from localStorage or API
    try {
      console.log("========== get user details ==========")
    const userDetails = localStorage.getItem("userDetails");
    console.log(userDetails)
    if (userDetails) {
      setUser(JSON.parse(userDetails));
      console.log(user)
    }} catch (error) {
        console.log(error);
    }
  };

  const logout = () => {
    // Clear user details from localStorage and navigate to login page
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  return { user, getUserDetails, logout };
};

export default useUserDetailsHook;