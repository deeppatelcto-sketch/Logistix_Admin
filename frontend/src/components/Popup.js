import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
  const dispatch = useDispatch();

  const vertical = "bottom"; // Set vertical position to bottom
  const horizontal = "center"; // Set horizontal position to center

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowPopup(false);
    dispatch(underControl());
    dispatch(underStudentControl());
  };

  const severity = message.includes("successfully") ? "success" : "error";

  return (
    <>
      <Snackbar
        open={showPopup}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "capitalize",
            color: severity === "success" ? "#155724" : "#721c24", // Green for success, red for error
            backgroundColor: severity === "success" ? "#d4edda" : "#f8d7da", // Light green for success, light red for error
            boxShadow: "0 4px 6px rgba(43, 254, 152, 0.24)", // Light shadow for the Alert box
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
