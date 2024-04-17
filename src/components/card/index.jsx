import { Card, CardContent, Typography } from "@mui/material";

const DynamicCard = ({ title, children, hideTitleAndHr }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        boxShadow: 3,
        borderRadius: "8px",
        boxShadow: "none",
        "&:hover": { boxShadow: "0px 0px 15px 5px rgba(128, 128, 128, 0.5)" },
      }}
    >
      <CardContent>
        {!hideTitleAndHr && (
          <>
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
            />
          </>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default DynamicCard;
