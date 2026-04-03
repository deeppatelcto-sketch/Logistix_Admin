// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllPlans,
//   deletePlan,
//   updatePlan,
// } from "../../../redux/planRelated/planHandle";
// import {
//   CircularProgress,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   DialogActions,
//   Button,
//   Grid,
//   Chip,
//   Box,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Snackbar,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
// import styled from "styled-components";

// const ShowPlans = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { plansList, loading } = useSelector((state) => state.plan);

//   const [viewPlan, setViewPlan] = useState(null);
//   const [editPlan, setEditPlan] = useState(null);
//   const [editedValues, setEditedValues] = useState({});
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [planToDelete, setPlanToDelete] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarColor, setSnackbarColor] = useState("green");
//   const [editDialogError, setEditDialogError] = useState("");

//   useEffect(() => {
//     dispatch(getAllPlans());
//   }, [dispatch]);

//   const handleDelete = () => {
//     if (planToDelete) {
//       dispatch(deletePlan(planToDelete._id))
//         .then(() => {
//           dispatch(getAllPlans());
//           setSnackbarMessage("Plan deleted successfully.");
//           setSnackbarColor("green");
//           setSnackbarOpen(true);
//         })
//         .catch(() => {
//           setSnackbarMessage("Failed to delete the plan.");
//           setSnackbarColor("red");
//           setSnackbarOpen(true);
//         });
//       setDeleteConfirmOpen(false);
//     }
//   };

//   const handleEditClick = (plan) => {
//     setEditPlan(plan);
//     setEditedValues({
//       ...plan,
//       price: plan.price || "",
//       baseRate: plan.baseRate || "",
//       docketCharge: plan.docketCharge ?? 0,
//       fuelCharge: plan.fuelCharge ?? 0,
//       minCharge: plan.minCharge ?? 0,
//       odaCharge: plan.odaCharge || "",
//       appointmentDeliveries: plan.appointmentDeliveries ?? 0,
//       integrations: plan.integrations || "",
//       whatsappUpdates: !!plan.whatsappUpdates,
//       prioritySupport: plan.prioritySupport || "",
//       ndrCallSetup: !!plan.ndrCallSetup,
//       additionalUsers: plan.additionalUsers || "",
//       usageLimit: plan.usageLimit || "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const val = e.target.type === "number" ? (value === "" ? "" : Number(value)) : value;
//     setEditedValues({ ...editedValues, [name]: val });
//   };

//   const handleCheckboxChange = (e) => {
//     setEditedValues({ ...editedValues, [e.target.name]: e.target.checked });
//   };

//   const handleUpdateSubmit = async () => {
//     try {
//       await dispatch(updatePlan(editPlan._id, editedValues));
//       setEditPlan(null);
//       dispatch(getAllPlans());
//       setSnackbarMessage("Plan updated successfully.");
//       setSnackbarColor("green");
//       setSnackbarOpen(true);
//       setEditDialogError("");
//     } catch (error) {
//       setEditDialogError(`❌ ${error.message || "Failed to update the plan."}`);
//       setSnackbarOpen(false);
//     }
//   };

//   const renderTable = () => {
//     if (loading)
//       return (
//         <LoaderContainer>
//           <CircularProgress />
//         </LoaderContainer>
//       );
//     if (!Array.isArray(plansList)) return <p>❌ Invalid data format</p>;
//     if (plansList.length === 0) return <p>No plans found.</p>;

//     return (
//       <TableWrapper>
//         <Table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Base Rate</th>
//               <th>Docket</th>
//               <th>Fuel Charge %</th>
//               <th>ODA Charge</th>
//               <th>Min Charge</th>
//               <th>Appointment Deliveries</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plansList.map((plan) => (
//               <tr key={plan._id}>
//                 <td>{plan.name}</td>
//                 <td>₹{plan.price}</td>
//                 <td>{plan.baseRate}</td>
//                 <td>{plan.docketCharge}</td>
//                 <td>{plan.fuelCharge}%</td>
//                 <td>{plan.odaCharge}</td>
//                 <td>{plan.minCharge}</td>
//                 <td>{plan.appointmentDeliveries}</td>
//                 <td>
//                   <IconButton onClick={() => setViewPlan(plan)}>
//                     <VisibilityIcon color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => handleEditClick(plan)}>
//                     <EditIcon color="secondary" />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => {
//                       setPlanToDelete(plan);
//                       setDeleteConfirmOpen(true);
//                     }}
//                   >
//                     <DeleteIcon color="error" />
//                   </IconButton>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </TableWrapper>
//     );
//   };

//   return (
//     <Wrapper>
//       <Header>
//   <LeftSection><h2>📦 Subscription Plans</h2></LeftSection>
//   <CenterSection>
//     {/* Optional Search Bar if needed later */}
//   </CenterSection>
//   <RightSection>
//     <AddButton onClick={() => navigate("/Admin/addplan")}>
//       + Add Plan
//     </AddButton>
//   </RightSection>
// </Header>

//       {renderTable()}
//       {/* All dialogs remain unchanged */}
//       {/* ... your dialogs and snackbar code ... */}
//     </Wrapper>
//   );
// };

// export default ShowPlans;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllPlans,
  deletePlan,
  updatePlan,
} from "../../../redux/planRelated/planHandle";
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Grid,
  Chip,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const ShowPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plansList, loading } = useSelector((state) => state.plan);

  const [viewPlan, setViewPlan] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green");
  const [editDialogError, setEditDialogError] = useState("");

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleDelete = () => {
    if (planToDelete) {
      dispatch(deletePlan(planToDelete._id))
        .then(() => {
          dispatch(getAllPlans());
          setSnackbarMessage("Plan deleted successfully.");
          setSnackbarColor("green");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to delete the plan.");
          setSnackbarColor("red");
          setSnackbarOpen(true);
        });
      setDeleteConfirmOpen(false);
    }
  };

  const handleEditClick = (plan) => {
    setEditPlan(plan);
    // Convert undefined to empty string or proper boolean if needed for controlled inputs
    setEditedValues({
      ...plan,
      price: plan.price || "",
      baseRate: plan.baseRate || "",
      docketCharge: plan.docketCharge ?? 0,
      fuelCharge: plan.fuelCharge ?? 0,
      minCharge: plan.minCharge ?? 0,
      odaCharge: plan.odaCharge || "",
      appointmentDeliveries: plan.appointmentDeliveries ?? 0,
      integrations: plan.integrations || "",
      whatsappUpdates: !!plan.whatsappUpdates,
      prioritySupport: plan.prioritySupport || "",
      ndrCallSetup: !!plan.ndrCallSetup,
      additionalUsers: plan.additionalUsers || "",
      usageLimit: plan.usageLimit || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For number inputs, convert value to number (if empty, keep empty string)
    const val =
      e.target.type === "number" ? (value === "" ? "" : Number(value)) : value;

    setEditedValues({
      ...editedValues,
      [name]: val,
    });
  };

  const handleCheckboxChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      // Here no docketCharge validation is done as requested

      await dispatch(updatePlan(editPlan._id, editedValues));
      setEditPlan(null);
      dispatch(getAllPlans());
      setSnackbarMessage("Plan updated successfully.");
      setSnackbarColor("green");
      setSnackbarOpen(true);
      setEditDialogError("");
    } catch (error) {
      setEditDialogError(
        `❌ ${error.message || "Failed to update the plan."}`
      );
      setSnackbarOpen(false);
    }
  };

  const renderTable = () => {
    if (loading)
      return (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      );
    if (!Array.isArray(plansList)) return <p>❌ Invalid data format</p>;
    if (plansList.length === 0) return <p>No plans found.</p>;

    return (
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Base Rate</th>
              <th>Docket </th>
              <th>Fuel Charge %</th>
              <th>ODA Charge</th>
              <th>Min Charge</th>
              <th>Appointment Deliveries</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plansList.map((plan) => (
              <tr key={plan._id}>
                <td>{plan.name}</td>
                <td>₹{plan.price}</td>
                <td>{plan.baseRate}</td>
                <td>{plan.docketCharge}</td>
                <td>{plan.fuelCharge}%</td>
                <td>{plan.odaCharge}</td>
                <td>{plan.minCharge}</td>
                <td>{plan.appointmentDeliveries}</td>
                <td>
                  <IconButton onClick={() => setViewPlan(plan)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleEditClick(plan)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setPlanToDelete(plan);
                      setDeleteConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    );
  };

  return (
    <Wrapper>
      <Header>
        <LeftSection><h2>📦 Subscription Plans</h2></LeftSection>
        <CenterSection>
          {/* Optional Search Bar if needed later */}
        </CenterSection>
        <RightSection>
          <AddButton onClick={() => navigate("/Admin/addplan")}>
            + Add Plan
          </AddButton>
        </RightSection>
      </Header>

      {renderTable()}

      {/* View Dialog */}
      <Dialog open={!!viewPlan} onClose={() => setViewPlan(null)} fullWidth>
        <DialogTitle>
          Plan Details
          <IconButton
            onClick={() => setViewPlan(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {viewPlan && (
            <>
              {[
                ["Name", viewPlan.name],
                ["Price", viewPlan.price],
                ["Base Rate", viewPlan.baseRate],
                ["Docket Charge (%)", viewPlan.docketCharge],
                ["Fuel Charge", viewPlan.fuelCharge],
                ["Min Charge", viewPlan.minCharge],
                ["ODA Charge", viewPlan.odaCharge],
                ["Appointment Deliveries", viewPlan.appointmentDeliveries],
                ["Integrations", viewPlan.integrations],
                ["Whatsapp Updates", viewPlan.whatsappUpdates],
                ["Priority Support", viewPlan.prioritySupport],
                ["NDR Call Setup", viewPlan.ndrCallSetup],
                ["Additional Users", viewPlan.additionalUsers],
                ["Usage Limit", viewPlan.usageLimit],
                ["Created At", new Date(viewPlan.createdAt).toLocaleString()],
                ["Updated At", new Date(viewPlan.updatedAt).toLocaleString()],
              ].map(([label, val]) => (
                <Box
                  key={label}
                  sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {typeof val === "boolean" ? (
                      <Chip label={val ? "Yes" : "No"} color={val ? "success" : "error"} size="small" />
                    ) : val?.toString() || "-"}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editPlan}
        onClose={() => {
          setEditPlan(null);
          setEditDialogError("");
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Edit Plan
          <IconButton
            onClick={() => {
              setEditPlan(null);
              setEditDialogError("");
            }}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {editDialogError && (
            <Box sx={{ color: "red", mb: 2, textAlign: "center" }}>
              {editDialogError}
            </Box>
          )}

          {editPlan && (
            <Grid container spacing={2}>
              {/* String inputs with label on top */}
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Price", name: "price", type: "text" },
                { label: "Base Rate", name: "baseRate", type: "text" },
                { label: "ODA Charge", name: "odaCharge", type: "text" },
                { label: "Integrations", name: "integrations", type: "text" },
                { label: "Priority Support", name: "prioritySupport", type: "text" },
                { label: "Additional Users", name: "additionalUsers", type: "text" },
                { label: "Usage Limit", name: "usageLimit", type: "text" },
              ].map(({ label, name, type }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>
                    {label}
                  </Box>
                  <TextField
                    name={name}
                    type={type}
                    value={editedValues[name] ?? ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    label="" // prevent default floating label
                  />
                </Grid>
              ))}

              {/* Number inputs with label on top */}
              {[
                { label: "Docket Charge (%)", name: "docketCharge" },
                { label: "Fuel Charge", name: "fuelCharge" },
                { label: "Min Charge", name: "minCharge" },
                { label: "Appointment Deliveries", name: "appointmentDeliveries" },
              ].map(({ label, name }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>
                    {label}
                  </Box>
                  <TextField
                    name={name}
                    type="number"
                    inputProps={{ min: 0 }}
                    value={editedValues[name] ?? ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    label=""
                  />
                </Grid>
              ))}

              {/* Boolean checkboxes */}
              {[
                { label: "Whatsapp Updates", name: "whatsappUpdates" },
                { label: "NDR Call Setup", name: "ndrCallSetup" },
              ].map(({ label, name }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={name}
                        checked={!!editedValues[name]}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>


      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this plan?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "#b71c1c" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={
          <span
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
          >
            {snackbarMessage}
          </span>
        }
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarColor || "#323232",
            color: "white",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            padding: "0 16px",
          },
        }}
      />
    </Wrapper>
  );
};

export default ShowPlans;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #ffffff;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;



const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1rem;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const LeftSection = styled.div`
  flex-shrink: 0;
`;

const CenterSection = styled.div`
  flex-grow: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1c7ed6;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 12px 0;
  }
`;


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;


const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

// 👇 Final fix: REMOVE `width: 100%` from <table> and set fixed min-width instead
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  /* ✅ Fixed full layout scroll behavior */
  min-width: 1000px;

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    white-space: nowrap; /* 💡 optional if text overflow must stay inline */
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;
