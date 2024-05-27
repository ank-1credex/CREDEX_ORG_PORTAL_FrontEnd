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
  const handleEmployeeClick = async (employeeName) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/getManager/allContributionByEmployee`,
        {
          name: employeeName,
        },
        {
          withCredentials: true,
        }
      );
      setEmployeeData(response.data.contributiions);
    } catch (error) {
      if (error.response.status === 404) alert("no contribtuion found");
      else alert("something went wrong");
      setEmployeeData(null);
    }
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
              <TableCell>FIRST_NAME</TableCell>
              <TableCell>LAST_NAME</TableCell>
              <TableCell>EMPLOYEE_ID</TableCell>
              <TableCell>CONTRIBUTIONS</TableCell>
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
