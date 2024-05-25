import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const ProjectUploadForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    address: "",
    isBillable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/getManager/uploadingProject",
        formData
      );
      if (response.status === 200) {
        setFormData({
          clientName: "",
          projectName: "",
          address: "",
          isBillable: false,
        });
        alert("uploaded succesfully");
      }
    } catch (error) {
      if (error.response.status === 409) alert("project already exists");
      else alert("failed to upload the project");
      setFormData({
        clientName: "",
        projectName: "",
        address: "",
        isBillable: false,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={2} style={{ maxWidth: 500, padding: 20 }}>
        <Typography variant="h5" gutterBottom align="centre">
          Create Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isBillable}
                    onChange={handleChange}
                    name="isBillable"
                    color="primary"
                  />
                }
                label="Is Billable"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProjectUploadForm;
