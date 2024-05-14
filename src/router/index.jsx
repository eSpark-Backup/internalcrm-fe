import { useState } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import ProtectRoute from "./protectRoute";
import PublicRoute from "./publicRoute";

import AppLayout from "../layout";

import Login from "../screens/auth/login";
import Dashboard from "../screens/dashboard";
import Members from "../screens/Members";
import AddEditMember from "../screens/Members/addEditMember";
import Teams from "../screens/Teams";
import Projects from "../screens/Projects";
import Cards from "../screens/cards";
import Assets from "../screens/assets";
import TeamDetail from "../screens/teamDetail";
import Sources from "../screens/sources";
import Status from "../screens/status";
import TaskDetail from "../screens/taskDetail";
import Table from "../screens/statusTable";

const AppRoutes = ({ setIsWhiteBg }) => {
  let routes = useRoutes([
    { element: <PublicRoute />, children: [{ path: "/", element: <Login /> }] },
    {
      element: <ProtectRoute />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/members", element: <Members /> },
        {
          path: "/members/add-member",
          element: <AddEditMember setIsWhiteBg={setIsWhiteBg} />,
        },
        { path: "/teams", element: <Teams /> },
        { path: "/projects", element: <Projects /> },
        { path: "/projects/cards/:projectName", element: <Cards /> },
        { path: "/projects/cards/:projectName/task", element: <TaskDetail /> },
        { path: "/projects/assets", element: <Assets /> },
        { path: "/teams/team-details", element: <TeamDetail /> },
        { path: "/lead-sources", element: <Sources /> },
        { path: "/lead-status", element: <Status /> },
        { path: "/status-table", element: <Table /> },
      ],
    },
  ]);

  return routes;
};

const AppWrapper = () => {
  const [isWhiteBg, setIsWhiteBg] = useState(false);

  return (
    <Router>
      <AppLayout isWhiteBg={isWhiteBg}>
        <AppRoutes setIsWhiteBg={setIsWhiteBg} />
      </AppLayout>
    </Router>
  );
};

export default AppWrapper;
