import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoute = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  if (token) return <Outlet />;
};

export default ProtectRoute;
