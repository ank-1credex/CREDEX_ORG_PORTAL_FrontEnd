/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, MenuItem, Select, Button } from "@mui/material";

import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
const EmployeeTable = ({ employeeData }) => {
  const [editedStatus, setEditedStatus] = useState({});
  const handleStatusChange = (employeeId, event) => {
    setEditedStatus({
      ...editedStatus,
      [employeeId]: event.target.value,
    });
  };

  const handleSaveStatus = (params) => {
    const newStatus = editedStatus[params.id];
    axios
      .post(
        "http://localhost:4000/api/v1/getManager/updateTheOrgData",
        {
          status: newStatus,
          id: params.id,
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

  const options = ["Pending", "Rejected", "Approved"];
  const columns = [
    { field: "id", headerName: "id", minWidth: 100 },
    { field: "projectId", headerName: "Project ID", minWidth: 100 },
    { field: "hours", headerName: "Hours", minWidth: 100 },
    { field: "message", headerName: "Message", minWidth: 200 },
    { field: "appliedDate", headerName: "Applied Date", minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => {
            handleStatusChange(params.id, event);
          }}
          fullWidth
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => (
        <Button
          onClick={() => {
            handleSaveStatus(params);
          }}
          startIcon={<SaveIcon />}
        ></Button>
      ),
    },
  ];

  const rows = employeeData.map((eachEmployee) => ({
    id: eachEmployee.id,
    projectId: eachEmployee.project_id,
    hours: eachEmployee.hours,
    message: eachEmployee.message,
    appliedDate: eachEmployee.applied_date,
    status: eachEmployee.status,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Typography
        sx={{
          marginBottom: "50px",
          fontWeight: "bold",
          marginTop: "50px",
          letterSpacing: "0.1em",
          fontSize: "24px",
        }}
      >
        Employees Contribution
      </Typography>
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
            },
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[100],
            },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default EmployeeTable;
