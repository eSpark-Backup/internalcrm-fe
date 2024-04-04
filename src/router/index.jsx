import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import AppLayout from "../layout";

import Dashboard from "../screens/dashboard";
import Members from "../screens/Members";
import Teams from "../screens/Teams";
import Projects from "../screens/Projects";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/members", element: <Members /> },
    { path: "/teams", element: <Teams /> },
    { path: "/projects", element: <Projects /> },
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
