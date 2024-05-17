import { useEffect, useState } from "react";
import useApiReqHook from "../../../res/hooks/ApiRequestHook";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import useConfirmationDialog from "../../../res/components/confirmationDialog/ConfirmationDialogHook";
import ConfirmationDialog from "../../../res/components/confirmationDialog/ConfirmationDialog";

const PatientList = () => {
  const navigate = useNavigate();
  const { loading, error: patientdataError, data: patientData, fetchData: fetchPatientData } = useApiReqHook();
  const {
    loading: patientDeleteLoading,
    error: patientdeleteError,
    data: deletedPatientData,
    fetchData: fetchDeletedEmpData,
  } = useApiReqHook();

  const [patients, setPatients] = useState([]);

  const {
    showConfirmationDialog,
    hideConfirmationDialog,
    handleConfirm,
    showDialog,
    confirmMessage,
  } = useConfirmationDialog();

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRefresh = () => {
    // Refresh user details if needed
    fetchPatients();
  };

  useEffect(() => {
    if (patientData && patientData.success) {
      console.log("Patients list =====", patientData);
      setPatients(patientData.data); // patient list
    }

    if (patientdataError) {
      console.log("Fetch Patients failure =====", patientdataError);
      console.log(`${patientdataError.message}`);
    }
  }, [patientData, patientdataError]);

  useEffect(() => {
    if (deletedPatientData && deletedPatientData.success) {
      console.log("Patient deleted =====", deletedPatientData);
      fetchPatients();
    }

    if (patientdeleteError) {
      console.log("delete patient failure =====", patientdeleteError);
      console.log(`${patientdeleteError.message}`);
    }
  }, [deletedPatientData, patientdeleteError]);

  const fetchPatients = () => {
    try {
      fetchPatientData("api/v1/patients/getAllPatients", "get");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    showConfirmationDialog("Are you sure you want to delete this item?", deletePatient(id));
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

  return (
    <div>
      <div className="list-header">
        <Row className="align-items-center justify-content-between">
          <Col className="text-center">
            <h2 className="pt-2">Patient List</h2> {/* Centered heading */}
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
          {patients.map((patient, index) => (
            <tr key={patient._id}>
              <td>{index + 1}</td>
              <td>{patient.fullName}</td>
              <td>{patient.email}</td>
              <td>
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
