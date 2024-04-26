import { Stack, styled } from "@mui/material";

import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

const AppLayout = ({ isWhiteBg, children }) => {
  const StackStyles = styled(Stack)(() => ({
    display: "block",
    padding: "0px 40px 40px",
    position: "relative",
    overflowX: "hidden",
    overflowY: isWhiteBg ? "auto" : "hidden",
    height: "100%",
    scrollbarWidth: "none",

    "@media only screen and (max-width: 1366px)": {
      padding: "0px 30px 40px",
    },

    "@media only screen and (max-width: 900px)": {
      padding: "0px 20px 30px",
    },

    "@media only screen and (max-width: 600px)": {
      padding: "0px 15px 30px",
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
