import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return userInfo ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
