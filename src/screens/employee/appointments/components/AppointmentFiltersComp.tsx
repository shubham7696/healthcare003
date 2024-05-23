import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

interface AppointmentFilterProps {
  onSearch: (query: string) => void;
  onDateChange: (date: string) => void;
}

const AppointmentFilterComp: React.FC<AppointmentFilterProps> = ({ onSearch, onDateChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <>
      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by phone or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </InputGroup>
      </Form>
      <Form.Group className="mb-3">
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="Select a date"
        />
      </Form.Group>
    </>
  );
};

export default AppointmentFilterComp;