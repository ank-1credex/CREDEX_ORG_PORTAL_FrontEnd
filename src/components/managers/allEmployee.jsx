import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../authContext/authContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const AllEmployee = ({ setEmployeeData }) => {
  const context = useContext(AuthContext);
  const handleEmployeeClick = (employeeName) => {
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
      })
      .catch((error) => {
        console.log(error.message);
        setEmployeeData(null);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "800px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FIRSTNAME</TableCell>
              <TableCell>LASTNAME</TableCell>
              <TableCell>employeeId</TableCell>
              <TableCell>CONTRIB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {context.employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleEmployeeClick(employee.first_name);
                    }}
                    component={Link}
                    to="/managers/employees/table"
                    variant="outlined"
                  >
                    View
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

export default AllEmployee;
