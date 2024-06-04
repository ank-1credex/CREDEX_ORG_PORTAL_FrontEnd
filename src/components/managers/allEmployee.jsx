import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";
import AuthContext from "../authContext/authContext";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const AllEmployee = ({ setEmployeeData, setEmployeeName }) => {
  const context = useContext(AuthContext);
  const handleEmployeeClick = (employeeName) => {
    setEmployeeName(null);
    axios
      .post(
        `http://localhost:4000/api/v1/getManager/allContributionByEmployee`,
        {
          name: employeeName,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setEmployeeData(response.data.contributiions);
        setEmployeeName(employeeName);
      })
      .catch((error) => {
        console.log(error.message);
        setEmployeeData(null);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200 },
    { field: "firstName", headerName: "First Name", minWidth: 200 },
    { field: "lastName", headerName: "Last Name", minWidth: 200 },
    { field: "employeeId", headerName: "Employee ID", minWidth: 200 },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 150,
      renderCell: (param) => (
        <Button
          onClick={() => {
            handleEmployeeClick(param.row.firstName);
          }}
          component={Link}
          to="/managers/employees/table"
          variant="outlined"
        >
          View
        </Button>
      ),
    },
  ];

  const rows = context.employees.map((employee) => ({
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    employeeId: employee.employee_id,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        alignItems: "center",
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
        Employee List
      </Typography>
      <Box sx={{ maxWidth: "1000px" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
            },
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[100],
            },
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
      </Box>
    </Box>
  );
};

export default AllEmployee;
