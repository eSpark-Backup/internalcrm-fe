import { Card, CardContent, Typography } from "@mui/material";

const DynamicCard = (props) => {
  const {
    title,
    member,
    card,
    card_style,
    card_content,
    onMouseEnter,
    onMouseLeave,
    children,
  } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        boxShadow: 3,
        borderRadius: "8px",
        boxShadow: "none",
        "&.MuiCard-root": card,
        "&:hover": { boxShadow: "0px 0px 15px 5px rgba(128, 128, 128, 0.5)" },
      }}
      className={card_style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className={card_content}>
        {!member && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Inter",
              fontWeight: "600",
              color: "#595959",
              textAlign: "left",
              padding: "0",
              fontSize: "25px",
            }}
          >
            {title}
          </Typography>
        )}
        {!member && (
          <hr
            style={{
              marginLeft: "-28px",
              marginRight: "-28px",
              border: "0.5px solid rgb(211, 208, 208)",
            }}
          ></hr>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default DynamicCard;
