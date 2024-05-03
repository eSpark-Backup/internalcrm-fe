import { Modal, Box, Typography, Button } from "@mui/material";

import CustomLoader from "../loading";

const DeleteConfirmationPopup = ({
  open,
  handleClose,
  handleDelete,
  heading,
  sentence,
  isDeleting,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 240,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: "30px 20px",
          borderRadius: "7px",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "semi",
            color: "#029E9C",
            marginBottom: "40px",
          }}
        >
          {heading}
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "30px", fontSize: "14px", textAlign: "center" }}
        >
          {sentence}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{
              padding: "7px 45px",
              color: "#068987",
              border: "1px solid #029894",
              textTransform: "capitalize",
              marginRight: "10px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            No
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              padding: "7px 45px",
              color: "#fff",
              background: "#029894 !important",
              textTransform: "capitalize",
              marginTop: "20px",
              fontWeight: "bold",
              width: "116px",
            }}
          >
            {isDeleting ? <CustomLoader /> : "Yes"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationPopup;
