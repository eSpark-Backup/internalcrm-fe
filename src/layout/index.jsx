import Sidebar from "../components/sidebar";

const AppLayout = ({ children }) => {
  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
};

export default AppLayout;
