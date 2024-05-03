import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { Typography } from "@mui/material";

import Label from "../common/inputLabel";

import Upload from "../../assets/logos/upload.svg?react";

import styles from "./style.module.css";

const FileUpload = (props) => {
  const { label, placeholder, onAcceptImage, sx } = props;

  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onAcceptImage && onAcceptImage(acceptedFiles[0]);
        acceptedFiles?.forEach((file) => setFileName(file.name));
      }
    },
    [onAcceptImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/msword": [".doc"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  return (
    <>
      {label && <Label label={label} />}

      <div {...getRootProps()} className={styles.image_container} style={sx}>
        <input {...getInputProps()} />
        <div
          className={styles.svg_container}
          style={{
            height: sx ? "100%" : "43px",
          }}
        >
          <Upload />
        </div>

        {fileName !== "" ? (
          <Typography
            variant="h6"
            className={`${styles.file_name} inter-regular`}
          >
            {fileName}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            className={`${styles.file_name} inter-regular`}
          >
            {placeholder}
          </Typography>
        )}
      </div>
    </>
  );
};

export default FileUpload;
