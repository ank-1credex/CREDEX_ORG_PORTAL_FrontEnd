import { Navigate, Outlet } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
