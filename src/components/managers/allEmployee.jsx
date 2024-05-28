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
import VisibilityIcon from "@mui/icons-material/Visibility";
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
        justifyContent: "center",
        marginTop: "70px",
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
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                FIRSTNAME
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                LASTNAME
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                employeeId
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {context.employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.first_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.last_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {employee.employee_id}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => {
                      handleEmployeeClick(employee.first_name);
                    }}
                    component={Link}
                    to="/managers/employees/table"
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
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
