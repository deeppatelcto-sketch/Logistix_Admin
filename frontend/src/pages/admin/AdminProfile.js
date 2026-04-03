// // import React, { useState } from 'react';
// // import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
// // import { useNavigate } from 'react-router-dom'
// // import { authLogout } from '../../redux/userRelated/userSlice';
// // import { Button, Collapse } from '@mui/material';

// import { useSelector } from 'react-redux';

// const AdminProfile = () => {
//     // const [showTab, setShowTab] = useState(false);
//     // const buttonText = showTab ? 'Cancel' : 'Edit profile';

//     // const navigate = useNavigate()
//     // const dispatch = useDispatch();
//         const { currentUser } = useSelector((state) => state.user);
//     // const { currentUser, response, error } = useSelector((state) => state.user);
//     // const address = "Admin"

//     // if (response) { console.log(response) }
//     // else if (error) { console.log(error) }

//     // const [name, setName] = useState(currentUser.name);
//     // const [email, setEmail] = useState(currentUser.email);
//     // const [password, setPassword] = useState("");
//     // const [schoolName, setSchoolName] = useState(currentUser.schoolName);

//     // const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

//     // const submitHandler = (event) => {
//     //     event.preventDefault()
//     //     dispatch(updateUser(fields, currentUser._id, address))
//     // }

//     // const deleteHandler = () => {
//     //     try {
//     //         dispatch(deleteUser(currentUser._id, "Students"));
//     //         dispatch(deleteUser(currentUser._id, address));
//     //         dispatch(authLogout());
//     //         navigate('/');
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // }

//     return (
//         <div>
//             Name: {currentUser.name}
//             <br />
//             Email: {currentUser.email}
//             <br />
//             School: {currentUser.schoolName}
//             <br />
//             {/* <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button> */}
//             {/* <Button variant="contained" sx={styles.showButton}
//                 onClick={() => setShowTab(!showTab)}>
//                 {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
//             </Button>
//             <Collapse in={showTab} timeout="auto" unmountOnExit>
//                 <div className="register">
//                     <form className="registerForm" onSubmit={submitHandler}>
//                         <span className="registerTitle">Edit Details</span>
//                         <label>Name</label>
//                         <input className="registerInput" type="text" placeholder="Enter your name..."
//                             value={name}
//                             onChange={(event) => setName(event.target.value)}
//                             autoComplete="name" required />

//                         <label>School</label>
//                         <input className="registerInput" type="text" placeholder="Enter your school name..."
//                             value={schoolName}
//                             onChange={(event) => setSchoolName(event.target.value)}
//                             autoComplete="name" required />

//                         <label>Email</label>
//                         <input className="registerInput" type="email" placeholder="Enter your email..."
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                             autoComplete="email" required />

//                         <label>Password</label>
//                         <input className="registerInput" type="password" placeholder="Enter your password..."
//                             value={password}
//                             onChange={(event) => setPassword(event.target.value)}
//                             autoComplete="new-password" />

//                         <button className="registerButton" type="submit" >Update</button>
//                     </form>
//                 </div>
//             </Collapse> */}
//         </div>
//     )
// }

// export default AdminProfile

// // const styles = {
// //     attendanceButton: {
// //         backgroundColor: "#270843",
// //         "&:hover": {
// //             backgroundColor: "#3f1068",
// //         }
// //     }
// // }



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userRelated/userHandle";
import { Button, TextField, Paper, Typography, Box, Snackbar, Alert } from "@mui/material";

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    // State for edit mode
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        schoolName: currentUser?.schoolName || "",
    });

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch update action
        await dispatch(updateUser(formData, currentUser._id, "Admin"));

        // Show success message
        setOpenSnackbar(true);

        // Reflect changes in UI
        setEditMode(false);
    };

    return (
        <Paper elevation={3} sx={styles.container}>
            <Typography variant="h5" sx={styles.title}>
                Admin Profile
            </Typography>

            {editMode ? (
                <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="School Name"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <Box sx={styles.buttonGroup}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={styles.info}>
                    <Typography><strong>Name:</strong> {currentUser.name}</Typography>
                    <Typography><strong>Email:</strong> {currentUser.email}</Typography>
                    <Typography><strong>School:</strong> {currentUser.schoolName}</Typography>

                    <Button
                        variant="contained"
                        sx={styles.editButton}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </Button>
                </Box>
            )}

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Closes after 3 seconds
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
                    Profile updated successfully!
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default AdminProfile;

const styles = {
    container: {
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        textAlign: "center",
        mt: 4,
        borderRadius: 2,
    },
    title: {
        mb: 2,
        fontWeight: "bold",
    },
    info: {
        textAlign: "left",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
    },
    editButton: {
        mt: 2,
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        },
    },
};
