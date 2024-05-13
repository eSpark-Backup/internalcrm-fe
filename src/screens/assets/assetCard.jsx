import { Typography, Card, CardContent, IconButton } from "@mui/material";

import Copy from "../../assets/logos/copy.svg?react";
import Download from "../../assets/logos/download.svg?react";
import DeleteLight from "../../assets/logos/delete-light.svg?react";
import CopyLight from "../../assets/logos/copy-light.svg?react";
import DownloadLight from "../../assets/logos/download-light.svg?react";

import { formatDate } from "../../utils/formatdate";

import styles from "./style.module.css";

const AssetCard = (props) => {
  const {
    asset,
    deleteAssetHandler,
    handleCopy,
    handleDownload,
    copyLink,
    downloadDocument,
    assetId,
  } = props;

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

        <div className="d-flex-center">
          {(copyLink || downloadDocument) && asset.id === assetId ? (
            <CommonButtonLight
              asset={asset}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              isVisible={copyLink || downloadDocument}
            />
          ) : (
            <CommonButtonDark
              asset={asset}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
            />
          )}

          <IconButton
            aria-label="delete"
            className={`${styles.delete} ${styles.common}`}
            onClick={() => deleteAssetHandler(asset?.id)}
          >
            <DeleteLight />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

const CommonButtonDark = ({ asset, handleCopy, handleDownload }) => {
  return (
    <IconButton
      aria-label={asset?.type}
      className={`${styles.common_button_dark} ${styles.common}`}
      onClick={() =>
        asset?.type === "link" ? handleCopy(asset) : handleDownload(asset)
      }
    >
      {asset?.type === "link" ? <Copy /> : <Download />}
    </IconButton>
  );
};

const CommonButtonLight = ({ asset }) => {
  return (
    <div className={`${styles.after_action}`}>
      <IconButton
        aria-label={asset?.type}
        className={`${styles.common_button_light} ${styles.common}`}
      >
        {asset?.type === "link" ? <CopyLight /> : <DownloadLight />}
      </IconButton>
      <span className={`${styles.text} inter-regular`}>
        {asset?.type === "link" ? "Copied!" : "Downloaded!"}
      </span>
    </div>
  );
};

export default AssetCard;
