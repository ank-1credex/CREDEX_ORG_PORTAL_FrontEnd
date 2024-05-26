import Navbar from "./components/navbar/navbar";
import Login from "./components/Authentication/login";
import Registration from "./components/Authentication/signup";
import Managers from "./components/managers/managers";
import ProjectUploadForm from "./components/managers/projectUpload";
import EmployeeDash from "./components/employee/employeedashboard";
import CreateContribution from "./components/employee/createContribution";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "./components/authContext/authContext";
import PrivateRoute from "./components/privateRoutes/privateRoutes";
import AllContributions from "./components/employee/allContributionOfEmployee";
import ProjectList from "./components/managers/projectList";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [user, setUser] = useState("employee");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeData(null);
    setEmployees([]);
    setUser("employee");
    navigate("/");
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, employees: employees }}
    >
      <Navbar
        handleLogout={handleLogout}
        setEmployeeData={setEmployeeData}
        user={user}
      />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={<Login handleLogin={handleLogin} setUser={setUser} />}
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
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
