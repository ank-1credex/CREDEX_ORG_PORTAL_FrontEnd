/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
const EmployeeTable = ({ employeeData }) => {
  const [editedStatus, setEditedStatus] = useState({});

  const handleStatusChange = (employeeId, event) => {
    setEditedStatus({
      ...editedStatus,
      [employeeId]: event.target.value,
    });
  };

  const handleSaveStatus = async (Id, employeeId, ProjectId) => {
    const newStatus = editedStatus[Id];
    console.log(newStatus);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/getManager/updateTheOrgData",
        {
          status: newStatus,
          user_id: employeeId,
          project_id: ProjectId,
          is_approved: 1,
        }
      );
      if (response.status === 200) alert("succesfully updated");
      else alert("failed to update it ");
    } catch (error) {
      console.log(error);
    }
  };

  if (!employeeData) {
    return (
      <Typography variant="h6">Select an employee to view details</Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>userId</TableCell>
            <TableCell>ProjectId</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>ActualHours</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Applied_Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.user_id}</TableCell>
              <TableCell>{employee.project_id}</TableCell>
              <TableCell>{employee.hours}</TableCell>
              <TableCell>{employee.actual_hours}</TableCell>
              <TableCell>{employee.message}</TableCell>
              <TableCell>{employee.applied_date}</TableCell>
              <TableCell>
                <Select
                  value={editedStatus[employee.id] || employee.status}
                  onChange={(e) => handleStatusChange(employee.id, e)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleSaveStatus(
                      employee.id,
                      employee.user_id,
                      employee.project_id
                    )
                  }
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
