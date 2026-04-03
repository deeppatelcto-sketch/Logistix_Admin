// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Tooltip,
//   Button,
//   Chip,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getWalletDetails } from "../../../redux/walletRelated/walletHandel";
// import { getAllCust } from "../../../redux/custRelated/custHandle";
// import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";

// const ShowWallets = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { custList } = useSelector((state) => state.cust);
//   const { courierCompanies } = useSelector((state) => state.couriercompany);
//   const { transactions, balance, loading } = useSelector((state) => state.wallet);

//   const [userType, setUserType] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     dispatch(getAllCust());
//     dispatch(getAllCourierCompanies());
//   }, [dispatch]);

//   const handleViewWallet = (user) => {
//     setSelectedUser(user);
//     dispatch(getWalletDetails({ userId: user._id, userModel: userType }));
//     setOpenDialog(true);
//   };

//   const renderUserList = () => {
//     const list = userType === "Customer" ? custList : courierCompanies;
//     return (
//       <div style={{ overflowX: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Action</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {list.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>
//                   {userType === "Customer"
//                     ? `${user.firstName || ""} ${user.lastName || ""}`
//                     : user.companyName || user.name}
//                 </TableCell>
//                 <TableCell>
//                   <Tooltip title="View Wallet">
//                     <IconButton onClick={() => handleViewWallet(user)} color="primary">
//                       <VisibilityIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     );
//   };

//   const renderTransactionType = (type) => {
//     const baseStyle = {
//       minWidth: 100,
//       height: 32,
//       borderRadius: 50,
//       fontWeight: "bold",
//       justifyContent: "center",
//       textTransform: "capitalize",
//     };

//     switch (type) {
//       case "credit":
//         return <Chip label="Recharge" color="success" sx={baseStyle} />;
//       case "debit":
//         return <Chip label="Debit" color="error" sx={baseStyle} />;
//       case "refund":
//         return <Chip label="Refund" color="info" sx={baseStyle} />;
//       default:
//         return <Chip label={type} sx={baseStyle} />;
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "20px 10px" }}>
//       <div style={styles.container}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h2 style={styles.heading}>📋 Wallet Management</h2>
//           <Button
//             variant="contained"
//             color="success"
//             startIcon={<AddCircleIcon />}
//             onClick={() => navigate("/Admin/wallet")}
//             sx={{ whiteSpace: "nowrap" }}
//           >
//             Recharge Wallet
//           </Button>
//         </div>

//         {/* Select Dropdown */}
//         <div style={{ marginBottom: 24 }}>
//           <label style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, display: "block", color: "#333" }}>
//             Select User Type
//           </label>
//           <FormControl fullWidth variant="outlined" size="medium">
//             <Select
//               value={userType}
//               onChange={(e) => {
//                 setUserType(e.target.value);
//                 setSelectedUser(null);
//                 setOpenDialog(false);
//               }}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 -- Select --
//               </MenuItem>
//               <MenuItem value="Customer">Customer</MenuItem>
//               <MenuItem value="CourierCompany">Courier Company</MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         {userType && renderUserList()}

//         {/* Wallet Dialog */}
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
//           <DialogTitle>
//             Wallet of{" "}
//             {userType === "Customer"
//               ? `${selectedUser?.firstName || ""} ${selectedUser?.lastName || ""}`
//               : selectedUser?.companyName || selectedUser?.name}
//             <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers>
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <>
//                 <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: 16 }}>
//                   💰 Current Balance: ₹{balance?.toFixed(2)}
//                 </p>

//                 {/* Make table horizontally scrollable on small screens */}
//                 <div style={{ overflowX: "auto" }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell><strong>Type</strong></TableCell>
//                         <TableCell><strong>Amount (₹)</strong></TableCell>
//                         <TableCell><strong>Description</strong></TableCell>
//                         <TableCell><strong>Date</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {transactions?.length > 0 ? (
//                         transactions.map((tx) => (
//                           <TableRow key={tx._id}>
//                             <TableCell>{renderTransactionType(tx.type)}</TableCell>
//                             <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
//                             <TableCell>{tx.description || "-"}</TableCell>
//                             <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={4} style={{ textAlign: "center" }}>
//                             No transactions found.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: 1000,
//     margin: "0 auto",
//     padding: 24,
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   heading: {
//     fontSize: 26,
//     color: "#2c3e50",
//     fontWeight: 600,
//   },
//   header: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: 10,
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 30,
//   },
// };

// export default ShowWallets;




import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Button,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getWalletDetails,
  getAllWallets,
} from "../../../redux/walletRelated/walletHandel";
import { getAllCust } from "../../../redux/custRelated/custHandle";
import { getAllCourierCompanies } from "../../../redux/couriercompanyRelated/couriercompanyHandle";

const ShowWallets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { custList } = useSelector((state) => state.cust);
  // const { courierCompanies } = useSelector((state) => state.couriercompany);
  const {
    allWallets,
    transactions,
    balance,
    loading,
  } = useSelector((state) => state.wallet);

  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllCust());
    dispatch(getAllCourierCompanies());
    dispatch(getAllWallets());
  }, [dispatch]);

  const handleViewWallet = (walletObj) => {
    setSelectedUser(walletObj);
    dispatch(
      getWalletDetails({
        userId: walletObj.userId,
        userModel: walletObj.userModel,
      })
    );
    setOpenDialog(true);
  };

  const renderTransactionType = (type) => {
    const baseStyle = {
      minWidth: 100,
      height: 32,
      borderRadius: 50,
      fontWeight: "bold",
      justifyContent: "center",
      textTransform: "capitalize",
    };

    switch (type) {
      case "credit":
        return <Chip label="Recharge" color="success" sx={baseStyle} />;
      case "debit":
        return <Chip label="Debit" color="error" sx={baseStyle} />;
      case "refund":
        return <Chip label="Refund" color="info" sx={baseStyle} />;
      default:
        return <Chip label={type} sx={baseStyle} />;
    }
  };

  const getUserDisplayName = (wallet) => {
    const user = wallet.userDetails || {};
    if (wallet.userModel === "Customer") {
      const first = user.firstName || "";
      const last = user.lastName || "";
      const phone = user.phoneNumber || "";
      return `${first} ${last} ${phone}`.trim() || "N/A";
    } else if (wallet.userModel === "CourierCompany") {
      return user.companyName || user.name || "N/A";
    }
    return "N/A";
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "20px 10px" }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>📋 Wallet Management</h2>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/Admin/wallet")}
            sx={{ whiteSpace: "nowrap" }}
          >
            Manage Wallet
          </Button>
        </div>

        {/* Filter by User Type */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 14,
              marginBottom: 8,
              display: "block",
              color: "#333",
            }}
          >
            Filter by User Type
          </label>
          <FormControl fullWidth variant="outlined" size="medium">
            <Select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setOpenDialog(false);
              }}
              displayEmpty
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="CourierCompany">Courier Company</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Wallet List Table */}
        <div style={{ overflowX: "auto" }}>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell><strong>User Type</strong></TableCell>
                <TableCell><strong>User Name</strong></TableCell>
                <TableCell><strong>Balance (₹)</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {allWallets
                .filter((w) => (userType ? w.userModel === userType : true))
                .map((w) => (
                  <TableRow key={w._id}>
                    <TableCell>{w.userModel}</TableCell>
                    <TableCell>{getUserDisplayName(w)}</TableCell>
                    <TableCell>{w.balance?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell>
                      <Tooltip title="View Wallet">
                        <IconButton
                          onClick={() => handleViewWallet(w)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody> */}

            <TableBody>
              {allWallets
                .filter((w) => (userType ? w.userModel === userType : true))
                .map((w, index, arr) => (
                  <TableRow
                    key={w._id}
                    sx={{
                      '&:last-child td, &:last-child th': { borderBottom: 0 },
                    }}
                  >
                    <TableCell>{w.userModel}</TableCell>
                    <TableCell>{getUserDisplayName(w)}</TableCell>
                    <TableCell>{w.balance?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell>
                      <Tooltip title="View Wallet">
                        <IconButton
                          onClick={() => handleViewWallet(w)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>


          </Table>
        </div>

        {/* Wallet Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
          <DialogTitle>
            Wallet of {selectedUser ? getUserDisplayName(selectedUser) : ""}
            <IconButton
              onClick={() => setOpenDialog(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: 16,
                  }}
                >
                  💰 Current Balance: ₹{balance?.toFixed(2) ?? "0.00"}
                </p>

                <div style={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Type</strong></TableCell>
                        <TableCell><strong>Amount (₹)</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {transactions?.length > 0 ? (
                        transactions.map((tx) => (
                          <TableRow key={tx._id || tx.date}>
                            <TableCell>{renderTransactionType(tx.type)}</TableCell>
                            <TableCell>₹{Number(tx.amount).toFixed(2)}</TableCell>
                            <TableCell>{tx.description || "-"}</TableCell>
                            <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} style={{ textAlign: "center" }}>
                            No transactions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody> */}

                    <TableBody>
                      {transactions?.length > 0 ? (
                        transactions.map((tx, index, arr) => (
                          <TableRow
                            key={tx._id || tx.date}
                            sx={{
                              '&:last-child td, &:last-child th': { borderBottom: 0 },
                            }}
                          >
                            <TableCell>{renderTransactionType(tx.type)}</TableCell>
                            <TableCell>₹{Number(tx.amount).toFixed(2)}</TableCell>
                            <TableCell>{tx.description || "-"}</TableCell>
                            <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} style={{ textAlign: "center" }}>
                            No transactions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>


                  </Table>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    paddingBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: 26,
    color: "#2c3e50",
    fontWeight: 600,
    
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
};

export default ShowWallets;
