import { BrowserRouter as Router, useRoutes } from "react-router-dom";

// import ProtectRoute from "./protectRoute";

import AppLayout from "../layout";

import Login from "../screens/auth/login";
import Dashboard from "../screens/dashboard";
import Members from "../screens/Members";
import AddEditMember from "../screens/Members/addEditMember";
import Teams from "../screens/Teams";
import Projects from "../screens/Projects";
// import PublicRoute from "./publicRoute";
import Cards from "../screens/cards";
import Assets from "../screens/assets";
import TeamDetail from "../screens/teamDetail";
import Sources from "../screens/sources";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    // {
    //   element: <ProtectRoute />,
    //   children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/members",
      element: <Members />,
    },
    {
      path: "/members/addMember",
      element: <AddEditMember />,
    },
    {
      path: "/teams",
      element: <Teams />,
    },
    {
      path: "projects",
      element: <Projects />,
    },
    //   ],
    // },
    { path: "/cards", element: <Cards /> },
    { path: "/assets", element: <Assets /> },
    { path: "/team-details", element: <TeamDetail /> },
    { path: "/sources", element: <Sources /> },


  ]);

  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export default AppWrapper;
