import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import SearchBar from "../../components/search";

import { body, header } from "../../constants/table";

import styles from "./style.module.css";

const MyTable = () => {
  return (
    <div style={{ height: "100%" }}>
      <SearchBar
        hideJobTitleSearch
        searchTextOne="Search by name"
        btn={true}
        btnText="Delete"
      />

      <div className={styles.container}>
        <Grid className={styles.tableContainer}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <div className={styles.scrollableTable}>
                <Table className={styles.table}>
                  <TableHead>
                    <TableRow>
                      {header.map((header, index) => (
                        <TableCell key={index}>
                          <Typography
                            className={`inter-medium ${styles.headStyle}`}
                          >
                            {header}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {body.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={styles.rowContainer}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Typography
                              variant="body2"
                              className={`inter-regular ${styles.rowStyle}`}
                            >
                              {cell}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyTable;
