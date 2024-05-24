import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

import { renderObject } from "./customTableData";

import styles from "./style.module.css";

const TeamTable = (props) => {
  const { headers, data, renderActions, objectType, sx } = props;

  return (
    <TableContainer sx={sx}>
      <Table stickyHeader aria-label="sticky table" sx={{ height: "100%" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                className={`${styles.header_cell} inter-medium`}
                key={index}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className={styles.table_body}>
          {data.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex}>
                {renderObject(row, objectType)}

                {renderActions && (
                  <TableCell className={styles.body_cell}>
                    {renderActions(row, rowIndex)}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
