import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import Label from "../common/inputLabel";

import Upload from "../../assets/logos/upload.svg?react";

import styles from "./style.module.css";

const FileUpload = (props) => {
  const { label, placeholder } = props;

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Label label={label} />

      <div {...getRootProps()} className={styles.image_container}>
        <input {...getInputProps()} />
        <div className={styles.svg_container}>
          <Upload />
        </div>
        <p>{placeholder}</p>
      </div>
    </>
  );
};

export default FileUpload;
