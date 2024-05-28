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

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.isLoggedIn) {
      axios
        .get("http://localhost:4000/api/v1/getManager/getAllProjectList", {
          withCredentials: true,
        })
        .then((response) => {
          setProjectList(response.data.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the contributions of this employee!",
            error
          );
        });
    }
  }, []);

  // const deleteProject = (id, name) => {
  //   axios
  //     .delete("http://localhost:4000/api/v1/getManager/deleteProjects", {
  //       data: { id: id, project_name: name },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       if (response.status == 200) {
  //         alert(" succesfully deleted  !!! ");
  //         axios
  //           .get("http://localhost:4000/api/v1/getManager/getAllProjectList", {
  //             withCredentials: true,
  //           })
  //           .then((response) => {
  //             setProjectList(response.data.data);
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       alert("failed to delete" + error);
  //     });
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "450px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", alignItem: "center" }}>
                SN No.
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", alignItem: "center" }}>
                Project Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", alignItem: "center" }}>
                Billable
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectList.map((project) => (
              <TableRow key={project.id}>
                <TableCell sx={{ alignItem: "center" }}>{project.id}</TableCell>
                <TableCell sx={{ alignItem: "center" }}>
                  {project.project_name}
                </TableCell>
                <TableCell sx={{ alignItem: "center" }}>
                  {project.is_billable == 1 ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProjectList;
