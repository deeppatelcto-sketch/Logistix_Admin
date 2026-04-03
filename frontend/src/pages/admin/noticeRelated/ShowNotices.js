// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import {
//     Paper, Box, IconButton, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert
// } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from '@mui/icons-material/Edit';
// import { getAllNotices, updateNotice } from '../../../redux/noticeRelated/noticeHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import { GreenButton } from '../../../components/buttonStyles';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import styled from 'styled-components';

// const ShowNotices = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const { noticesList, loading, error } = useSelector((state) => state.notice);
//     const { currentUser } = useSelector(state => state.user);

//     const [selectedNotice, setSelectedNotice] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);  // 🔹 Snackbar State

//     useEffect(() => {
//         dispatch(getAllNotices(currentUser._id, "Notice"));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.error(error);
//     }

//     const deleteHandler = (deleteID) => {
//         dispatch(deleteUser(deleteID, "Notice"))
//             .then(() => dispatch(getAllNotices(currentUser._id, "Notice")));
//     };

//     const handleEdit = (notice) => {
//         setSelectedNotice(notice);
//         setOpen(true);
//     };

//     const handleUpdate = () => {
//         if (!selectedNotice) return;

//         dispatch(updateNotice(selectedNotice.id, selectedNotice))
//             .then(() => {
//                 setOpen(false);
//                 setOpenSnackbar(true);  // 🔹 Show Success Popup
//                 dispatch(getAllNotices(currentUser._id, "Notice"));
//             });
//     };

//     const noticeColumns = [
//         { id: 'title', label: 'Title', minWidth: 170 },
//         { id: 'details', label: 'Details', minWidth: 100 },
//         { id: 'date', label: 'Date', minWidth: 170 },
//     ];

//     const noticeRows = noticesList?.map((notice) => ({
//         title: notice.title,
//         details: notice.details,
//         date: new Date(notice.date).toISOString().substring(0, 10),
//         id: notice._id,
//     }));

//     const NoticeButtonHaver = ({ row }) => (
//         <>
//             <IconButton onClick={() => handleEdit(row)}>
//                 <EditIcon color="primary" />
//             </IconButton>
//             <IconButton onClick={() => deleteHandler(row.id)}>
//                 <DeleteIcon color="error" />
//             </IconButton>
//         </>
//     );

//     const actions = [
//         {
//             icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
//             action: () => navigate("/Admin/addnotice")
//         },
//         {
//             icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
//             action: () => deleteHandler(currentUser._id)
//         }
//     ];

//     return (
//         <StyledContainer>
//             {loading ? (
//                 <LoaderWrapper>
//                     <CircularProgress size={50} color="primary" />
//                 </LoaderWrapper>
//             ) : (
//                 <>
//                     <StyledHeader>
//                         <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//                             Notices Board 📜
//                         </Typography>
//                         <GreenButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
//                             Add Notice
//                         </GreenButton>
//                     </StyledHeader>

//                     <StyledPaper>
//                         {noticesList?.length > 0 ? (
//                             <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
//                         ) : (
//                             <NoNoticeMessage>No notices available</NoNoticeMessage>
//                         )}
//                     </StyledPaper>

//                     <SpeedDialTemplate actions={actions} />

//                     {/* 🟢 Edit Notice Modal */}
//                     <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
//                         <DialogTitle>Edit Notice</DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 fullWidth margin="dense" label="Title"
//                                 value={selectedNotice?.title || ""}
//                                 onChange={(e) => setSelectedNotice({ ...selectedNotice, title: e.target.value })}
//                             />
//                             <TextField
//                                 fullWidth margin="dense" label="Details"
//                                 multiline rows={3}
//                                 value={selectedNotice?.details || ""}
//                                 onChange={(e) => setSelectedNotice({ ...selectedNotice, details: e.target.value })}
//                             />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setOpen(false)}>Cancel</Button>
//                             <Button onClick={handleUpdate} color="primary">Update</Button>
//                         </DialogActions>
//                     </Dialog>

//                     {/* ✅ Snackbar Popup for Successful Update */}
//                     <Snackbar
//                         open={openSnackbar}
//                         autoHideDuration={3000} 
//                         onClose={() => setOpenSnackbar(false)}
//                         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//                     >
//                         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
//                             Notice updated successfully!
//                         </Alert>
//                     </Snackbar>

//                 </>
//             )}
//         </StyledContainer>
//     );
// };

// export default ShowNotices;

// // 🔹 Styled Components
// const StyledContainer = styled(Box)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const StyledHeader = styled(Box)`
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   margin-bottom: 20px;
// `;

// const StyledPaper = styled(Paper)`
//   width: 100%;
//   max-width: 900px;
//   overflow: hidden;
//   border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(10px);
//   padding: 20px;
// `;

// const NoNoticeMessage = styled(Typography)`
//   text-align: center;
//   font-size: 1.2rem;
//   color: white;
//   padding: 20px;
// `;

// const LoaderWrapper = styled(Box)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { getAllNotices, updateNotice } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { noticesList, loading } = useSelector((state) => state.notice);
  const { currentUser } = useSelector((state) => state.user);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllNotices(currentUser._id, 'Notice'));
    }
  }, [currentUser._id, dispatch]);

  const deleteHandler = (deleteID) => {
    dispatch(deleteUser(deleteID, 'Notice')).then(() =>
      dispatch(getAllNotices(currentUser._id, 'Notice'))
    );
  };

  const handleEdit = (notice) => {
    setSelectedNotice({ ...notice }); // Store full notice object
  };

  const handleUpdate = () => {
    if (!selectedNotice) return;

    const { _id, ...updatedFields } = selectedNotice;

    dispatch(updateNotice(_id, updatedFields)).then(() => {
      setSelectedNotice(null);
      setOpenSnackbar(true);
      dispatch(getAllNotices(currentUser._id, 'Notice'));
    });
  };

  const renderTable = () => {
    if (loading) return <LoaderContainer><CircularProgress /></LoaderContainer>;

    if (!Array.isArray(noticesList)) {
      return <p>❌ Invalid data format. Expected an array of notices.</p>;
    }

    if (noticesList.length === 0) {
      return <p>No customers found.</p>;
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {noticesList.map((notice) => (
            <tr key={notice._id}>
              <td>{notice.firstName}</td>
              <td>{notice.lastName}</td>
              <td>{notice.email}</td>
              <td>{notice.address}</td>
              <td>{notice.phoneNumber}</td>
              <td>
                <IconButton onClick={() => handleEdit(notice)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteHandler(notice._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h2>👥 Customers</h2>
        <AddButton onClick={() => navigate('/Admin/addnotice')}>
          + Add Customer
        </AddButton>
      </Header>

      {renderTable()}

      {/* ✏️ Edit Dialog */}
      <Dialog open={!!selectedNotice} onClose={() => setSelectedNotice(null)} fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          {['firstName', 'lastName', 'email', 'address', 'phoneNumber'].map((field) => (
            <div key={field}>
              <InputLabel>{field.replace(/([A-Z])/g, ' $1')}</InputLabel>
              <Input
                name={field}
                value={selectedNotice?.[field] || ''}
                onChange={(e) => setSelectedNotice({ ...selectedNotice, [field]: e.target.value })}
                fullWidth
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedNotice(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Customer updated successfully!
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ShowNotices;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: auto;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-weight: 600;
    color: #343a40;
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

  &:hover {
    background-color: #1c7ed6;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
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
