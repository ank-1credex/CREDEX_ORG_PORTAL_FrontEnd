/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
const EmployeeTable = ({ employeeData, employeeName, setEmployeeData }) => {
  const [editedStatus, setEditedStatus] = useState({});
  // const [remark, setRemark] = useState({});

  const handleStatusChange = (employeeId, event) => {
    setEditedStatus({
      ...editedStatus,
      [employeeId]: event.target.value,
    });
  };

  // const handleRemarkChange = (params, event) => {
  //   setRemark({
  //     ...remark,
  //     [params.id]: event.target.value,
  //   });
  // };

  const handleSaveStatus = (params) => {
    const newStatus = editedStatus[params.id];
    axios
      .post(
        "http://localhost:4000/api/v1/getManager/updateTheOrgData",
        {
          status: newStatus,
          id: params.id,
          name: employeeName,
          // remark: remark[params.id],
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setEmployeeData(response.data.data);
          alert("succesfully updated");
        }
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
      renderCell: (params) =>
        params.value === "Pending" ? (
          <Select
            value={params.value}
            onChange={(event) => {
              handleStatusChange(params.id, event);
            }}
            fullWidth
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        ) : (
          <div>{params.row.status}</div>
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
          disabled={params.row.status !== "Pending"}
        ></Button>
      ),
    },
    {
      field: "remark",
      headerName: "Remark",
      minWidth: 200,
      renderCell: (params) => (
        <TextField
          fullWidth
          // onChange={(event) => {
          //   // handleRemarkChange(params, event);
          // }}
          disabled={params.row.status !== "Pending"}
        />
      ),
    },
  ];

  const rows = employeeData.map((eachEmployee) => {
    return {
      id: eachEmployee.id,
      projectId: eachEmployee.project_id,
      hours: eachEmployee.hours,
      message: eachEmployee.message,
      appliedDate: eachEmployee.applied_date,
      status: eachEmployee.status,
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
        height: "100vh",
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
        {`${employeeName}'s Contribution`}
      </Typography>
      <Box sx={{ maxHeight: "450px" }}>
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
