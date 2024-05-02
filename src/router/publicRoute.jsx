import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoute = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return <Outlet />;
};

export default PublicRoute;
