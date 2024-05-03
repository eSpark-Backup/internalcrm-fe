import { Typography, Card, CardContent, IconButton } from "@mui/material";

import Copy from "../../assets/logos/copy.svg?react";
import Download from "../../assets/logos/download.svg?react";
import DeleteLight from "../../assets/logos/delete-light.svg?react";

import { formatDate } from "../../utils/formatdate";

const AssetCard = (props) => {
  const { asset, deleteAssetHandler } = props;

  return (
    <Card
      key={asset?.id}
      sx={{
        width: "100%",
        marginBottom: "15px",
        borderRadius: "12px",
        boxShadow:
          "0px 1px 1px -1px rgba(0,0,0,0.2),0px 0px 1px 0px rgba(0,0,0,0.14),0px 4px 8px 0px rgba(0,0,0,0.12)",
      }}
    >
      <CardContent
        style={{
          display: "grid",
          gridTemplateColumns: "3.5fr 1fr 1fr",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">{asset?.resource}</Typography>

        <Typography variant="body2" color="textSecondary">
          {formatDate(asset?.createdAt)}
        </Typography>

        <div>
          <IconButton
            aria-label="copy"
            sx={{
              backgroundColor: "#068987",
              padding: "10px",
              marginRight: "20px",
              "&:hover": {
                backgroundColor: "#068987",
              },
            }}
          >
            {asset?.type === "link" ? <Copy /> : <Download />}
          </IconButton>

          <IconButton
            aria-label="delete"
            sx={{
              backgroundColor: "#FF0000",
              padding: "11px",
              marginRight: "-30px",
              "&:hover": {
                backgroundColor: "#FF0000",
              },
            }}
            onClick={() => deleteAssetHandler(asset?.id)}
          >
            <DeleteLight />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
