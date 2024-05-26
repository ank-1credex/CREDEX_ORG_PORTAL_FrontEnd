import { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  //   Select,
  //   MenuItem,
  //   Button,
  Box,
} from "@mui/material";
import axios from "axios";
import AuthContext from "../authContext/authContext";

const AllContributionOfEmployee = () => {
  const [allContributions, setAllContributions] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.isLoggedIn) {
      axios
        .get(
          "http://localhost:4000/api/v1/getEmployee/AllcontributionOfEmployee",
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setAllContributions(response.data.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the contributions of this employee!",
            error
          );
        });
    }
  }, []);

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
              <TableCell>userId</TableCell>
              <TableCell>ProjectId</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Applied_Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allContributions.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.user_id}</TableCell>
                <TableCell>{employee.project_id}</TableCell>
                <TableCell>{employee.hours}</TableCell>
                <TableCell>{employee.message}</TableCell>
                <TableCell>{employee.applied_date}</TableCell>
                <TableCell>{employee.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllContributionOfEmployee;
