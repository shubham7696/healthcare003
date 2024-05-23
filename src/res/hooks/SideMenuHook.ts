import { useState } from 'react';
import { faUsers, faUserPlus, faFileAlt, faListAlt, faUserEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


const useSideMenuHook = () => {
  // Define initial menu options and their visibility based on user type
  const [menuOptions, setMenuOptions] = useState([
    { label: 'All Employee', path: '/empList', typeFor: "admin", visible: true, icon: faUsers },
    { label: 'Add Employee', path: '/addEmp', typeFor: "admin", visible: true, icon: faUserPlus },
    { label: 'New Requests', path: '/empReq', typeFor: "admin", visible: true, icon: faFileAlt },
    { label: 'All Patients', path: '/patientList', typeFor: ["admin", "data_operator"], visible: true, icon: faListAlt },
    { label: 'Add Patients', path: '/addPatient', typeFor: ["admin", "data_operator"], visible: true, icon: faUserEdit },
    { label: 'Add Appointments', path: '/addAppointment', typeFor: "data_operator", visible: true, icon: faCalendarAlt },
    { label: 'All Appointments', path: '/allAppointment', typeFor: "data_operator", visible: true, icon: faCalendarAlt },
  ]);

  // Function to update menu options based on user type
  const updateMenuOptions = (userType) => {
    // Example: Hide options based on userType
    setMenuOptions(menuOptions.map(option => ({
      ...option,
      visible: Array.isArray(option.typeFor) ? option.typeFor.includes(userType) : option.typeFor === userType
    })));
  };

  return { menuOptions, updateMenuOptions };
};

export default useSideMenuHook;