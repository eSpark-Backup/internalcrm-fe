import { Stack } from "@mui/material";

import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

const AppLayout = ({ children }) => {
  return (
    <Sidebar>
      <Stack
        sx={{
          display: "block",
          padding: { xs: "0px 18px", md: "0px 40px 40px" },
          position: "relative",
          overflowX: "hidden",
          overflowY: "auto",
          height: "100%",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </Stack>

      <Footer />
    </Sidebar>
  );
};

export default AppLayout;
