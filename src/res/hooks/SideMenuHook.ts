import { useState } from 'react';

const useSideMenuHook = () => {
  // Define initial menu options and their visibility based on user type
  const [menuOptions, setMenuOptions] = useState([
    { label: 'All Employee', path: '/empList', typeFor: "admin", visible: true },
    { label: 'Add Employee', path: '/addEmp', typeFor: "admin", visible: true },
    { label: 'New Requests', path: '/empReq', typeFor: "admin", visible: true },
    { label: 'All Patients', path: '/patientList', typeFor: "data_operator", visible: true },
    { label: 'Add Patients', path: '/addPatient', typeFor: "data_operator", visible: true },
    { label: 'All Appointments', path: '/allAppointment', typeFor: "data_operator", visible: true },
  ]);

  // Function to update menu options based on user type
  const updateMenuOptions = (userType) => {
    // Example: Hide options based on userType
    setMenuOptions(menuOptions.map(option => ({ ...option, visible: option.typeFor === userType })));
  };

  return { menuOptions, updateMenuOptions };
};

export default useSideMenuHook;