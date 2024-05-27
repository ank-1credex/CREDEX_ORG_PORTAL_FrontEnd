import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useContext } from "react";
import AuthContext from "../authContext/authContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Managers = ({ setEmployees }) => {
  const context = useContext(AuthContext);
  useEffect(() => {
    if (context.isLoggedIn) {
      axios
        .post(
          "http://localhost:4000/api/v1/getManager/allMemberOfManager",
          {
            managers_name: "sumit ranjan",
          },
          {
            withCredentials: true,
          }
        )
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
