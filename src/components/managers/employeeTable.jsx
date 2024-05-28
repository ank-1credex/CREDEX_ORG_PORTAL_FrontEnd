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
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  // border: "1px solid rgba(224, 224, 224, 1)",
  textAlign: "center",
  fontWeight: "bold",
  // backgroundColor: theme.palette.action.hover,
}));

const EmployeeTable = ({ employeeData }) => {
  const [editedStatus, setEditedStatus] = useState({});

  const handleStatusChange = (employeeId, event) => {
    setEditedStatus({
      ...editedStatus,
      [employeeId]: event.target.value,
    });
  };

  const handleSaveStatus = (Id, employeeId, ProjectId) => {
    const newStatus = editedStatus[Id];
    axios
      .post(
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
      )
      .then((response) => {
        if (response.status == 200) alert("succesfully updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!employeeData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "300px",
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
        marginTop: "70px",
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
              <StyledTableCell>ProjectId</StyledTableCell>
              <StyledTableCell>Hours</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Applied_Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.project_id}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.hours}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.message}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.applied_date}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Select
                    value={editedStatus[employee.id] || employee.status}
                    onChange={(e) => handleStatusChange(employee.id, e)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() =>
                      handleSaveStatus(
                        employee.id,
                        employee.user_id,
                        employee.project_id
                      )
                    }
                    startIcon={<SaveIcon />}
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
