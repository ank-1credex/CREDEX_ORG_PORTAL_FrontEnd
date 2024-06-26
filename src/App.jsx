import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Login from "./components/Authentication/login";
import Registration from "./components/Authentication/signup";
import Managers from "./components/managers/managers";
import ProjectUploadForm from "./components/managers/projectUpload";
import EmployeeDash from "./components/employee/employeedashboard";
import CreateContribution from "./components/employee/createContribution";
import AuthContext from "./components/authContext/authContext";
import PrivateRoute from "./components/privateRoutes/privateRoutes";
import AllContributions from "./components/employee/allContributionOfEmployee";
import ProjectList from "./components/managers/projectList";
import AllEmployee from "./components/managers/allEmployee";
import EmployeeTable from "./components/managers/employeeTable";

function App() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    role: "employee",
  });
  const [employeeName, setEmployeeName] = useState();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeData(null);
    setEmployees([]);
    setCurrentUser({
      name: "",
      role: "employee",
    });
    setEmployeeName();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        employees: employees,
        currentUser: currentUser,
      }}
    >
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={
            <Login handleLogin={handleLogin} setCurrentUser={setCurrentUser} />
          }
        />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/projectUpload" element={<ProjectUploadForm />} />
          <Route path="/employee" element={<EmployeeDash />} />
          <Route
            path="/managers"
            element={
              <Managers
                employeeData={employeeData}
                setEmployees={setEmployees}
              />
            }
          />
          <Route
            path="/employee/contribution"
            element={<CreateContribution />}
          />
          <Route path="/viewcontributions" element={<AllContributions />} />
          <Route path="/projectlists" element={<ProjectList />} />
          <Route
            path="/managers/employees"
            element={
              <AllEmployee
                setEmployeeData={setEmployeeData}
                setEmployeeName={setEmployeeName}
              />
            }
          />
          <Route
            path="/managers/employees/table"
            element={
              <EmployeeTable
                employeeData={employeeData}
                employeeName={employeeName}
                setEmployeeData={setEmployeeData}
              />
            }
          />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
