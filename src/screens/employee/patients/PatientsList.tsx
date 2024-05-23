import { useEffect, useState } from "react";
import useApiReqHook from "../../../res/hooks/ApiRequestHook";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import useConfirmationDialog from "../../../res/components/confirmationDialog/ConfirmationDialogHook";
import ConfirmationDialog from "../../../res/components/confirmationDialog/ConfirmationDialog";

const PatientList = () => {
  const navigate = useNavigate();
  const {
    loading,
    error: patientdataError,
    data: patientData,
    fetchData: fetchPatientData,
  } = useApiReqHook();
  const {
    loading: patientDeleteLoading,
    error: patientdeleteError,
    data: deletedPatientData,
    fetchData: fetchDeletedEmpData,
  } = useApiReqHook();

  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(7); // Adjust as needed
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    showConfirmationDialog,
    hideConfirmationDialog,
    handleConfirm,
    showDialog,
    confirmMessage,
  } = useConfirmationDialog();

  useEffect(() => {
    fetchPatients(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleRefresh = () => {
    // Refresh user details if needed
    fetchPatients(currentPage, searchQuery);
  };

  useEffect(() => {
    if (patientData && patientData.success) {
      console.log("Patients list =====", patientData);
      setPatients(patientData.data); // patient list
      setTotalPages(patientData.totalPages);
    }

    if (patientdataError) {
      console.log("Fetch Patients failure =====", patientdataError);
      console.log(`${patientdataError.message}`);
    }
  }, [patientData, patientdataError]);

  useEffect(() => {
    if (deletedPatientData && deletedPatientData.success) {
      console.log("Patient deleted =====", deletedPatientData);
      fetchPatients(currentPage, searchQuery); // Refetch patients after deletion
    }

    if (patientdeleteError) {
      console.log("delete patient failure =====", patientdeleteError);
      console.log(`${patientdeleteError.message}`);
    }
  }, [deletedPatientData, patientdeleteError]);

  const fetchPatients = async (page = 1, query = "") => {
    try {
      const url = `api/v1/patients/getAllPatients?page=${page}&limit=${patientsPerPage}&searchQuery=${query}`;

      fetchPatientData(url, "get");
    } catch (error) {
      console.log(error);
    }
  };

  // manage pagination on UI
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    showConfirmationDialog("Are you sure you want to delete this item?", () => deletePatient(id));
  };

  const handleAddAppointment = (patient) => {
    navigate("/addAppointment", { state: { patient } });
  };

  const deletePatient = (id) => {
    console.log(id);
    const payload = {
      patientId: id,
      employeeType: localStorage.getItem("userType"),
    };
    fetchDeletedEmpData(`api/v1/patients/deletePatient/${id}`, "delete", payload);
  };

  const editPatient = (patient) => {
    console.log(patient);
    navigate("/updatePatient", { state: patient });
  };

  const handelSearch = (e) => {
    setSearchQuery(e.target.value);
    // whenever new text is entered consider it as a fresh start
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="list-header">
        <Row className="align-items-center justify-content-between">
          <Col className="text-center">
            <h2 className="pt-2">Patient List</h2> {/* Centered heading */}
          </Col>
          <Col xs="auto">
            <Button onClick={handleRefresh} className="refresh-button">
              <FontAwesomeIcon icon={faRefresh} /> {/* Refresh Icon */}
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-between">
            <Col xs="auto">
                <Form.Control 
                type="text"
                placeholder="Search Email or phone number"
                value={searchQuery}
                onChange={handelSearch}/>
            </Col>
        </Row>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="thead-light">
            {patients.map((patient, index) => (
              <tr key={patient._id}>
                <td>{index + 1 + (currentPage - 1) * patientsPerPage}</td>
                <td>{patient.fullName}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  <Button
                    onClick={() => handleAddAppointment(patient)}
                    variant="outline-primary"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  {"  "}
                  <Button onClick={() => editPatient(patient)} variant="outline-secondary">
                    <FontAwesomeIcon icon={faEdit} /> {/* Refresh Icon */}
                  </Button>
                  {"  "}
                  <Button onClick={() => handleDelete(patient._id)} variant="outline-danger">
                    <FontAwesomeIcon icon={faTrash} /> {/* Refresh Icon */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 col-2"
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 col-2"
        >
          Next
        </Button>
      </div>
      <ConfirmationDialog
        show={showDialog}
        onHide={hideConfirmationDialog}
        onConfirm={handleConfirm}
        message={confirmMessage}
      />
    </div>
  );
};

export default PatientList;
