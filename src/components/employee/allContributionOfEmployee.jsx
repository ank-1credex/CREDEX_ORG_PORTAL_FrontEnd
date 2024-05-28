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
  Button,
  TextField,
  Typography,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
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
  const [project, setAllProject] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newData, setNewData] = useState({ hours: "", message: "" });

  const context = useContext(AuthContext);

  const handleEditClick = (employee) => {
    setSelectedRow(employee.id);
    setNewData({ hours: employee.hours, message: employee.message });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUserContribution = () => {
    axios
      .get(
        "http://localhost:4000/api/v1/getEmployee/AllcontributionOfEmployee",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAllContributions(response.data.data.allContribution);
        setAllProject(response.data.data.Project);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the contributions of this employee!",
          error
        );
      });
  };

  const handleSaveClick = (id) => {
    axios
      .put(
        "http://localhost:4000/api/v1/getEmployee/updateEmployeeContributionData",
        {
          id: id,
          ...newData,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSelectedRow(null);
          fetchUserContribution();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (context.isLoggedIn) {
      fetchUserContribution();
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center"
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
        All contributions
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "1000px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ProjectName</StyledTableCell>
              <StyledTableCell>Hours</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Applied_Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allContributions.map((employee) => (
              <TableRow key={employee.id}>
                <StyledTableCell>
                  {project[employee.project_id - 1].project_name}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRow === employee.id ? (
                    <TextField
                      name="hours"
                      value={newData.hours}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.hours
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRow === employee.id ? (
                    <TextField
                      name="message"
                      value={newData.message}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.message
                  )}
                </StyledTableCell>
                <StyledTableCell>{employee.applied_date}</StyledTableCell>
                <StyledTableCell>{employee.status}</StyledTableCell>
                <StyledTableCell>
                  {selectedRow === employee.id ? (
                    <Button
                      onClick={() => {
                        handleSaveClick(employee.id);
                      }}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleEditClick(employee);
                      }}
                      startIcon={<UpdateIcon />}
                    >
                      Update
                    </Button>
                  )}
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
