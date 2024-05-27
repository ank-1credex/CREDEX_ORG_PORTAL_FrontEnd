import { useEffect, useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import AuthContext from "../authContext/authContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Managers = ({ setEmployees }) => {
  const context = useContext(AuthContext);
  useEffect(() => {
    if (context.isLoggedIn) {
      axios
        .get("http://localhost:4000/api/v1/getManager/allMemberOfManager", {
          withCredentials: true,
        })
        .then((response) => {
          setEmployees(response.data.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the employee list!",
            error
          );
        });
    }
  }, [context.isLoggedIn, setEmployees]);

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography component="p" variant="h3">
          Welcome Managers
        </Typography>
      </Box>
    </Container>
  );
};

export default Managers;
