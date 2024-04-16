import { Stack } from "@mui/material";

import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

const AppLayout = ({ children }) => {
  return (
    <Sidebar>
      <Stack
        sx={{
          display: "block",
          padding: { xs: "0px 18px", md: "0px 40px" },
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {children}
      </Stack>

      <Footer />
    </Sidebar>
  );
};

export default AppLayout;
