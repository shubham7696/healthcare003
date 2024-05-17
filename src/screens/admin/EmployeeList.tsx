import { useEffect, useState } from "react";
import useApiReqHook from "../../res/hooks/ApiRequestHook";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import useConfirmationDialog from "../../res/components/confirmationDialog/ConfirmationDialogHook";
import ConfirmationDialog from "../../res/components/confirmationDialog/ConfirmationDialog";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { loading, error: empdataError, data: empData, fetchData: fetchEmpData } = useApiReqHook();
  const { loading:empDeleteLoading, error: empdeleteError, data: deletedEmpData, fetchData: fetchDeletedEmpData } = useApiReqHook();

  const [employees, setEmployees] = useState([]);

  const {
    showConfirmationDialog,
    hideConfirmationDialog,
    handleConfirm,
    showDialog,
    confirmMessage,
  } = useConfirmationDialog();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleRefresh = () => {
    // Refresh user details if needed
    fetchEmployees();
  };

  useEffect(() => {
    if (empData && empData.success) {
      console.log("Employee list =====", empData);
      setEmployees(empData.data); // employee list
    }

    if (empdataError) {
      console.log("Fetch employee failure =====", empdataError);
      console.log(`${empdataError.message}`);
    }
  }, [empData, empdataError]);

  useEffect(() => {
    if (deletedEmpData && deletedEmpData.success) {
      console.log("Employee deleted =====", deletedEmpData);
      fetchEmployees();
    }

    if (empdeleteError) {
      console.log("delete employee failure =====", empdeleteError);
      console.log(`${empdeleteError.message}`);
    }
  }, [deletedEmpData, empdeleteError]);

  const fetchEmployees = () => {
    try {
      fetchEmpData("api/v1/employee/getAllEmployee", "get");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    showConfirmationDialog("Are you sure you want to delete this item?", deleteEmp(id));
  };

  const deleteEmp = (id) => {
    console.log(id);
    const payload = {
      empId: id,
      employeeType: localStorage.getItem("userType"),
    };
    fetchDeletedEmpData(`api/v1/employee/deleteEmp/${id}`, "delete", payload);
    
  };

  const editEmp = (employee) => {
    console.log(employee);
    navigate("/updateEmp", {state: employee})

  };

  return (
    <div>
      <div className="list-header">
        <Row className="align-items-center justify-content-between">
          <Col className="text-center">
            <h2 className="pt-2">Employee List</h2> {/* Centered heading */}
          </Col>
          <Col xs="auto">
            <Button onClick={() => handleRefresh} className="refresh-button">
              <FontAwesomeIcon icon={faRefresh} /> {/* Refresh Icon */}
            </Button>
          </Col>
        </Row>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="thead-light">
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>
                <Button onClick={() => editEmp(employee)} variant="outline-secondary">
                  <FontAwesomeIcon icon={faEdit} /> {/* Refresh Icon */}
                </Button>
                {"  "}
                <Button onClick={() => handleDelete(employee._id)} variant="outline-danger">
                  <FontAwesomeIcon icon={faTrash} /> {/* Refresh Icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        show={showDialog}
        onHide={hideConfirmationDialog}
        onConfirm={handleConfirm}
        message={confirmMessage}
      />
    </div>
  );
};

export default EmployeeList;
