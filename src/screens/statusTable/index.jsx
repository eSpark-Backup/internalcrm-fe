import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./style.module.css";
import SearchBar from "../../components/search";

const MyTable = () => {
  const [isActive, setIsActive] = React.useState(true);

  // Sample data for headers and cells
  const headerData = [
    "Name",
    "Title",
    "Email",
    "Prospects LinkedIn",
    "Company Name",
    "Industry",
    "Company Website",
    "Company Linkedin",
    "Primary No",
    "Date",
    "Sales Person",
    "Call Make",
    "Lead Status",
    "Email Status",
    "Sales Note",
  ];
  const rowData = [
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
    [
      "Name",
      "Title",
      "Email",
      "Prospects LinkedIn",
      "Company Name",
      "Industry",
      "Company Website",
      "Company Linkedin",
      "Primary No",
      "Date",
      "Sales Person",
      "Call Make",
      "Lead Status",
      "Email Status",
      "Sales Note",
    ],
  ];

  return (
    <div style={{ height: "100%" }}>
      <div style={{ marginBottom: "50px" }}>
        <SearchBar
          hideJobTitleSearch
          searchTextOne="Search by name"
          btn={!!isActive}
          btnText="Delete"
        />
      </div>
      <div className={styles.container}>
        <Grid className={styles.tableContainer}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <div className={styles.scrollableTable}>
                <Table className={styles.table}>
                  <TableHead>
                    <TableRow>
                      {headerData.map((header, index) => (
                        <TableCell key={index}>
                          <Typography className={styles.headStyle}>
                            {header}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowData.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={styles.rowContainer}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Typography
                              className={styles.rowStyle}
                              variant="body2"
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
