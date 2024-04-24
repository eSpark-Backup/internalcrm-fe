import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { CopyIcon } from "../../components/svg/copyIcon";
import { DeleteIcon } from "../../components/svg/deleteIcon";

const Status = () => {
  const [links, setLinks] = useState([
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
    {
      url: "https://www.figma.com/file/ZJrkg0zmOVpFPVzluXuODi/CRM?type=design&node-id=215-2681&mode=design&t=IU477jiPHgmKjez1-0",
      date: "22 September,23",
    },
  ]);
  return (
    <div>
     {links.map((link, index) => (
              <Card
                key={index}
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
                  <Typography variant="body1">{link.url}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {link.date}
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
                      onClick={() => {
                        /* Handle copy */
                      }}
                    >
                      {/* Your SVG icon */}
                      <CopyIcon />
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
                      onClick={() => {
                        setDeletingIndex(index); // Set the index of the item being deleted
                        setDeleteModalOpen(true); // Open the delete confirmation modal
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))}
    </div>
  );
};

export default Status;
