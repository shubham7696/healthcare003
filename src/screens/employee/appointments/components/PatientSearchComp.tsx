import React, { useEffect, useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import useApiReqHook from "../../../../res/hooks/ApiRequestHook";
import Patient from "../interface/Patient";

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
  initialPatient?: Patient;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onPatientSelect, initialPatient }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { loading, error, data, fetchData } = useApiReqHook();

  useEffect(() => {
    if (initialPatient) {
      setSelectedPatient(initialPatient);
    }
  }, [initialPatient]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    try {
      const url = `api/v1/patients/getAllPatients?page=1&limit=20&searchQuery=${query}`;
      fetchData(url, "get");
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  // Handle success and error states

  useEffect(() => {
    if (data && data.success) {
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
    }

    if (error) {
      console.log("Failed to fetch search results", error);
    }
  }, [data, error]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    onPatientSelect(patient);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>Search Patient</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search by Email or Phone Number"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchResults.length > 0 && (
        <Dropdown.Menu show>
          {searchResults.map((patient) => (
            <Dropdown.Item key={patient._id} onClick={() => handlePatientSelect(patient)}>
              {patient.email} - {patient.phoneNumber}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
      {selectedPatient && ( // Render selected patient details if exists
        <div className="selected-patient">
          <p>Name: {selectedPatient.fullName}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Phone Number: {selectedPatient.phoneNumber}</p>
        </div>
      )}
    </Form.Group>
  );
};

export default PatientSearch;
