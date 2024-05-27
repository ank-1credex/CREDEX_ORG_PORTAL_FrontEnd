import { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import AuthContext from "../authContext/authContext";

import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid rgba(224, 224, 224, 1)",
  textAlign: "center",
  backgroundColor: theme.palette.action.hover,
}));

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
            </TableRow>
          </TableHead>
          <TableBody>
            {allContributions.map((employee) => (
              <TableRow key={employee.id}>
                <StyledTableCell>{employee.project_id}</StyledTableCell>
                <StyledTableCell>{employee.hours}</StyledTableCell>
                <StyledTableCell>{employee.message}</StyledTableCell>
                <StyledTableCell>{employee.applied_date}</StyledTableCell>
                <StyledTableCell
                  style={{
                    color: employee.status === "rejected" ? "red" : "inherit",
                  }}
                >
                  {employee.status}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllContributionOfEmployee;
