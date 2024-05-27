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
  Box,
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
        },
        {
          withCredentials: true,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4">NO Contrubution By this User</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "1000px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ProjectId</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Applied_Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.project_id}</TableCell>
                <TableCell>{employee.hours}</TableCell>
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
    </Box>
  );
};

export default EmployeeTable;
