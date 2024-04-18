import { Stack, styled } from "@mui/material";

import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

const AppLayout = ({ children }) => {
  const StackStyles = styled(Stack)(() => ({
    display: "block",
    padding: "0px 40px 40px",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    height: "100%",
    scrollbarWidth: "none",

    "@media only screen and (max-width: 1366px)": {
      padding: "0px 30px 40px",
    },

    "@media only screen and (max-width: 900px)": {
      padding: "0px 20px 0px",
    },

    "@media only screen and (max-width: 600px)": {
      padding: "0px 15px 0px",
    },
  }));

  return (
    <Sidebar>
      <StackStyles>{children}</StackStyles>

      <Footer />
    </Sidebar>
  );
};

export default AppLayout;
