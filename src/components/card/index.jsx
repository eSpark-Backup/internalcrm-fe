import { Card, CardContent, Typography } from "@mui/material";

const DynamicCard = ({ title, children }) => {
  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", boxShadow: 3, borderRadius: "8px" }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "400",
            color: "#595959",
            textAlign: "left",
            padding: "0",
          }}
        >
          {title}
        </Typography>
        <hr
          style={{
            marginLeft: "-28px",
            marginRight: "-28px",
            border: "0.5px solid rgb(211, 208, 208)",
          }}
        ></hr>
        {children}
      </CardContent>
    </Card>
  );
};

export default DynamicCard;
