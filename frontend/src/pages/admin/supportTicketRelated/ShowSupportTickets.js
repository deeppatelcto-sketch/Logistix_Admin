// import React, { useEffect, useState } from "react";
// import {
//     Button,
//     Typography,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     IconButton,
//     TextField,
//     Select,
//     MenuItem,
//     // InputLabel,
//     FormControl,
//     Snackbar,
//     Alert,
//     CircularProgress,
//     // Table,
//     // TableBody,
//     // TableCell,
//     // TableHead,
//     // TableRow,
//     // Box
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchAllTickets,
//     deleteTicket,
//     replyToTicket,
//     changeTicketStatus
// } from "../../../redux/supportTicketRelated/supportHandle";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const ShowSupportTickets = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { tickets, loading } = useSelector((state) => state.support);                      
//     const [selectedTicket, setSelectedTicket] = useState(null);
//     const [replyMessage, setReplyMessage] = useState("");
//     const [status, setStatus] = useState("");
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//     const [confirmDeleteId, setConfirmDeleteId] = useState(null);

//     useEffect(() => {
//         dispatch(fetchAllTickets());
//     }, [dispatch]);

//     useEffect(() => {
//         if (selectedTicket) {
//             setStatus(selectedTicket.status || "Open");
//         }
//     }, [selectedTicket]);

//     const openConfirmDialog = (id) => setConfirmDeleteId(id);
//     const closeConfirmDialog = () => setConfirmDeleteId(null);

//     const confirmDelete = () => {
//         dispatch(deleteTicket(confirmDeleteId))
//             .then(() => {
//                 dispatch(fetchAllTickets());
//                 setSnackbarMessage("Ticket deleted successfully!");
//                 setSnackbarSeverity("success");
//             })
//             .catch(() => {
//                 setSnackbarMessage("❌ Failed to delete ticket.");
//                 setSnackbarSeverity("error");
//             })
//             .finally(() => {
//                 setSnackbarOpen(true);
//                 closeConfirmDialog();
//             });
//     };

//     const handleReply = () => {
//         if (selectedTicket && replyMessage) {
//             const formData = new FormData();
//             formData.append("message", replyMessage);
//             formData.append("repliedBy", "admin");
//             dispatch(replyToTicket(selectedTicket.ticketId, formData))
//                 .then(() => {
//                     setSnackbarMessage("Reply sent successfully!");
//                     setSnackbarSeverity("success");
//                     dispatch(fetchAllTickets());
//                     setSelectedTicket(null);
//                 })
//                 .catch(() => {
//                     setSnackbarMessage("❌ Failed to send reply.");
//                     setSnackbarSeverity("error");
//                 })
//                 .finally(() => {
//                     setSnackbarOpen(true);
//                     setReplyMessage("");
//                 });
//         }
//     };

//     const handleStatusChange = () => {
//         if (selectedTicket && status) {
//             dispatch(changeTicketStatus(selectedTicket.ticketId, status))
//                 .then(() => {
//                     setSnackbarMessage("Status updated successfully!");
//                     setSnackbarSeverity("success");
//                     dispatch(fetchAllTickets());
//                     setSelectedTicket(null);
//                 })
//                 .catch(() => {
//                     setSnackbarMessage("❌ Failed to update status.");
//                     setSnackbarSeverity("error");
//                 })
//                 .finally(() => {
//                     setSnackbarOpen(true);
//                 });
//         }
//     };

//     const handleSnackbarClose = (_, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbarOpen(false);
//     };

//     return (
//         <Wrapper>
//             <Header>
//                 <LeftSection>
//                     <h2>Support Tickets</h2>
//                 </LeftSection>
//                 <CenterSection />
//                 <RightSection>
//                     <AddButton onClick={() => navigate("/Admin/AddSupportTicket")}>+ Add Ticket</AddButton>
//                 </RightSection>
//             </Header>

//             {loading ? (   
//                 <LoaderContainer>       
//                     <CircularProgress />           
//                 </LoaderContainer>
//             ) : (
//                 <TableContainer>
//                     <TableStyled>
//                         <thead>
//                             <tr>
//                                 <th>Ticket ID</th>
//                                 <th>Category</th>
//                                 <th>Subject</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tickets.map((ticket) => (
//                                 <tr key={ticket._id}>
//                                     <td>{ticket.ticketId}</td>
//                                     <td>{ticket.category}</td>
//                                     <td>{ticket.subject}</td>
//                                     <td>{ticket.status}</td>
//                                     <td>
//                                         <IconButton onClick={() => setSelectedTicket(ticket)}>
//                                             <VisibilityIcon color="primary" />
//                                         </IconButton>
//                                         <IconButton onClick={() => openConfirmDialog(ticket.ticketId)}>
//                                             <DeleteIcon color="error" />
//                                         </IconButton>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </TableStyled>
//                 </TableContainer>
//             )}


//             {/* View & Reply Dialog */}
//             <Dialog
//                 open={!!selectedTicket}
//                 onClose={() => setSelectedTicket(null)}
//                 fullWidth
//                 maxWidth="md"
//                 sx={{
//                     "& .MuiDialog-paper": {
//                         borderRadius: 4,
//                         boxShadow: 6,
//                         padding: 1,
//                         width: "700px"
//                     }
//                 }}
//             >
//                 <DialogTitle sx={{ fontWeight: 600, fontSize: "1.5rem", position: "relative", pr: 6 }}>
//                     Ticket #{selectedTicket?.ticketId}
//                     <IconButton
//                         onClick={() => setSelectedTicket(null)}
//                         sx={{
//                             position: "absolute",
//                             right: 8,
//                             top: 8,
//                             color: "grey.500"
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent >
//                     <Typography><strong>Subject:</strong> {selectedTicket?.subject}</Typography>
//                     <Typography><strong>Description:</strong> {selectedTicket?.description}</Typography>
//                     <Typography><strong>Status:</strong> {selectedTicket?.status}</Typography>

//                     <Typography mt={2}><strong>Replies:</strong></Typography>
//                     {selectedTicket?.replies?.map((r, i) => (
//                         <Typography key={i} sx={{ pl: 2 }}>• {r.repliedBy}: {r.message}</Typography>
//                     ))}

//                     <TextField
//                         fullWidth

//                         placeholder="Reply Message"
//                         multiline
//                         rows={3}
//                         value={replyMessage}
//                         onChange={(e) => setReplyMessage(e.target.value)}
//                         sx={{ mt: 2 }}
//                     />
//                     <Button variant="contained" onClick={handleReply} sx={{ mt: 3 }}>
//                         Send Reply
//                     </Button>

//                     <FormControl fullWidth sx={{ mt: 2 }}>
//                         <Typography variant="subtitle2" sx={{ fontSize: '14px', fontWeight: '600', mb: 0.5 }} >Select</Typography>

//                         <Select
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}

//                         >
//                             <MenuItem value="Open">Open</MenuItem>
//                             <MenuItem value="Pending">Pending</MenuItem>
//                             <MenuItem value="Closed">Closed</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <Button onClick={handleStatusChange} variant="contained" sx={{ mt: 3 }}>
//                         Update Status
//                     </Button>
//                 </DialogContent>
//             </Dialog>

//             {/* Snackbar */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//                 <Alert
//                     onClose={handleSnackbarClose}
//                     severity={snackbarSeverity}
//                     sx={{
//                         width: "100%",
//                         fontWeight: 500,
//                         fontSize: "1rem",
//                         backgroundColor: snackbarSeverity === "success" ? "green" : "red",
//                         color: "white",
//                         borderRadius: "8px",
//                         boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
//                         padding: "0 16px"
//                     }}
//                     icon={false}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>Are you sure you want to delete this ticket?</DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeConfirmDialog} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={confirmDelete} color="error" variant="contained">
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Wrapper>
//     );
// };

// export default ShowSupportTickets;



// // Styled Components
// const Wrapper = styled.div`
//   padding: 2rem;
//   max-width: 1500px;
//   margin: auto;
//   background: #ffffff;
//   min-height: 100vh;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 25px;
//   flex-wrap: wrap;
//   gap: 16px;

//   @media (max-width: 770px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const LeftSection = styled.div`

//   @media (max-width: 770px) {
//     width: 100%;
//   }
// `;

// const CenterSection = styled.div`
//   flex: 2;
//   display: flex;
//   justify-content: center;

//   @media (max-width: 770px) {
//     width: 100%;
//     justify-content: flex-start;
//   }
// `;

// const RightSection = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;

//   @media (max-width: 770px) {
//     width: 100%;
//     justify-content: flex-start;
//   }
// `;

// const AddButton = styled.button`
//   background-color: #339af0;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-weight: bold;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #1c7ed6;
//   }

//   @media (max-width: 770px) {
//     width: 100%;
//   }
// `;


// const TableContainer = styled.div`
//   width: 100%;
//   overflow-x: auto;
// `;

// const TableStyled = styled.table`
//   width: 100%;
//   min-width: 800px;
//   border-collapse: collapse;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//   th,
//   td {
//     padding: 14px 20px;
//     text-align: left;
//     border-bottom: 1px solid #dee2e6;
//     font-size: 14px;
//   }

//   th {
//     background-color: #f1f3f5;
//     font-weight: 600;
//   }

//   tr:hover {
//     background-color: #f8f9fa;
//   }
// `;

// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 50px;
// `;





import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllTickets,
    deleteTicket,
    replyToTicket,
    changeTicketStatus
} from "../../../redux/supportTicketRelated/supportHandle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ShowSupportTickets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tickets, loading } = useSelector((state) => state.support);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [status, setStatus] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllTickets());
    }, [dispatch]);

    useEffect(() => {
        if (selectedTicket) {
            setStatus(selectedTicket.status || "Open");
        }
    }, [selectedTicket]);

    const openConfirmDialog = (id) => setConfirmDeleteId(id);
    const closeConfirmDialog = () => setConfirmDeleteId(null);

    const confirmDelete = () => {
        dispatch(deleteTicket(confirmDeleteId))
            .then(() => {
                dispatch(fetchAllTickets());
                setSnackbarMessage("Ticket deleted successfully!");
                setSnackbarSeverity("success");
            })
            .catch(() => {
                setSnackbarMessage("❌ Failed to delete ticket.");
                setSnackbarSeverity("error");
            })
            .finally(() => {
                setSnackbarOpen(true);
                closeConfirmDialog();
            });
    };

    const handleReply = () => {
        if (selectedTicket && replyMessage) {
            const formData = new FormData();
            formData.append("message", replyMessage);
            formData.append("repliedBy", "admin");
            dispatch(replyToTicket(selectedTicket.ticketId, formData))
                .then(() => {
                    setSnackbarMessage("Reply sent successfully!");
                    setSnackbarSeverity("success");
                    dispatch(fetchAllTickets());
                    setSelectedTicket(null);
                })
                .catch(() => {
                    setSnackbarMessage("❌ Failed to send reply.");
                    setSnackbarSeverity("error");
                })
                .finally(() => {
                    setSnackbarOpen(true);
                    setReplyMessage("");
                });
        }
    };

    const handleStatusChange = () => {
        if (selectedTicket && status) {
            dispatch(changeTicketStatus(selectedTicket.ticketId, status))
                .then(() => {
                    setSnackbarMessage("Status updated successfully!");
                    setSnackbarSeverity("success");
                    dispatch(fetchAllTickets());
                    setSelectedTicket(null);
                })
                .catch(() => {
                    setSnackbarMessage("❌ Failed to update status.");
                    setSnackbarSeverity("error");
                })
                .finally(() => {
                    setSnackbarOpen(true);
                });
        }
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <Wrapper>
            <Header>
                <LeftSection>
                    <h2>Support Tickets</h2>
                </LeftSection>
                <CenterSection />
                <RightSection>
                    <AddButton onClick={() => navigate("/Admin/AddSupportTicket")}>+ Add Ticket</AddButton>
                </RightSection>
            </Header>

            {loading ? (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            ) : (
                <TableContainer>
                    <TableStyled>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Category</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket._id}>
                                    <td>{ticket.ticketId}</td>
                                    <td>{ticket.category}</td>
                                    <td>{ticket.subject}</td>
                                    <td>{ticket.status}</td>
                                    <td>
                                        <IconButton onClick={() => setSelectedTicket(ticket)}>
                                            <VisibilityIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => openConfirmDialog(ticket.ticketId)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableStyled>
                </TableContainer>
            )}

            {/* View & Reply Dialog */}
            <Dialog
                open={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 4,
                        boxShadow: 6,
                        padding: 1,
                        width: "700px"
                    },
                    "& strong": { fontWeight: 500 } // 👈 reduced font weight for all <strong> tags
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, fontSize: "1.5rem", position: "relative", pr: 6 }}>
                    Ticket #{selectedTicket?.ticketId}
                    <IconButton
                        onClick={() => setSelectedTicket(null)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "grey.500"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography><strong>Subject:</strong> {selectedTicket?.subject}</Typography>
                    <Typography><strong>Description:</strong> {selectedTicket?.description}</Typography>
                    <Typography><strong>Status:</strong> {selectedTicket?.status}</Typography>

                    <Typography mt={2}><strong>Replies:</strong></Typography>
                    {selectedTicket?.replies?.map((r, i) => (
                        <Typography key={i} sx={{ pl: 2 }}>• {r.repliedBy}: {r.message}</Typography>
                    ))}

                    <TextField
                        fullWidth
                        placeholder="Reply Message"
                        multiline
                        rows={3}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={handleReply} sx={{ mt: 3 }}>
                        Send Reply
                    </Button>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontSize: '16px', fontWeight: '500', mb: 0.5 }} >Select</Typography>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleStatusChange} variant="contained" sx={{ mt: 3 }}>
                        Update Status
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{
                        width: "100%",
                        fontWeight: 500,
                        fontSize: "1rem",
                        backgroundColor: snackbarSeverity === "success" ? "green" : "red",
                        color: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                        padding: "0 16px"
                    }}
                    icon={false}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this ticket?</DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
};

export default ShowSupportTickets;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #ffffff;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const LeftSection = styled.div`
  @media (max-width: 770px) {
    width: 100%;
  }
`;

const CenterSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 770px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 770px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const AddButton = styled.button`
  background-color: #339af0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c7ed6;
  }

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TableStyled = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
