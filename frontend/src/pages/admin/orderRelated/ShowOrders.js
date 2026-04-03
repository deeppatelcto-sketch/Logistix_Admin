// import React, { useEffect, useState } from 'react';
// import {
//   TableHead, TableRow, TableCell, TableBody,
//   IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, Grid, Typography, Checkbox, FormControlLabel,
//   CircularProgress, Box, MenuItem
// } from '@mui/material';
// import { Edit, Delete, Visibility, Close } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllOrders, deleteOrder, updateOrder } from '../../../redux/orderRelated/orderHandel';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const Wrapper = styled.div` padding: 20px;  background-color: white;
//     min-height: 100vh;`;
// const Header = styled.div` display: flex; justify-content: space-between; align-items: center; `;
// const AddButton = styled.button`
//   padding: 8px 16px;
//   background-color: #1976d2;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;
// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 40px;
// `;
// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   margin-top:30px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//   th, td {
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

// const ShowOrders = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { orders, loading, error } = useSelector((state) => state.order);
//   const [statusFilter, setStatusFilter] = useState('');


//   const [viewOrder, setViewOrder] = useState(null);
//   const [editOrder, setEditOrder] = useState(null);
//   const [editedValues, setEditedValues] = useState({});

//   useEffect(() => {
//     dispatch(getAllOrders());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteOrder(id)).then(() => dispatch(getAllOrders()));
//   };

//   const handleEditClick = (order) => {
//     setEditOrder(order);
//     setEditedValues(order);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedValues({
//       ...editedValues,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const filteredOrders = statusFilter
//     ? orders.filter((order) => order.status === statusFilter)
//     : orders;

//   // ✅ FIXED handleUpdateSubmit with correct dispatch call
//   const handleUpdateSubmit = async () => {
//     try {
//       await dispatch(updateOrder({ id: editOrder._id, updatedData: editedValues }));
//       setEditOrder(null);
//       dispatch(getAllOrders());
//     } catch (error) {
//       console.error('Update failed:', error);
//     }
//   };

//   const renderTable = () => {
//     if (loading) {
//       return <LoaderContainer><CircularProgress /></LoaderContainer>;
//     }

//     if (error) {
//       return <p>Error: {error}</p>;
//     }

//     if (!Array.isArray(orders) || orders.length === 0) {
//       return <p>No orders found.</p>;
//     }

//     return (
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Order ID</TableCell>
//             <TableCell>Pickup Pincode</TableCell>
//             <TableCell>Delivery Pincode</TableCell>
//             <TableCell>Weight</TableCell>
//             <TableCell>Qty</TableCell>
//             <TableCell>Courier Company</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredOrders.map((order) => (
//             <TableRow key={order._id}>
//               <TableCell>{order.orderId}</TableCell>
//               <TableCell>{order.pickupPincode}</TableCell>
//               <TableCell>{order.deliveryPincode}</TableCell>
//               <TableCell>{order.weight}</TableCell>
//               <TableCell>{order.qty}</TableCell>
//               <TableCell>{order.selectedCourierCompany}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => setViewOrder(order)}><Visibility color="primary" /></IconButton>
//                 <IconButton onClick={() => handleEditClick(order)}><Edit color="secondary" /></IconButton>
//                 <IconButton onClick={() => handleDelete(order._id)}><Delete color="error" /></IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     );
//   };

//   return (
//     <Wrapper>
//       <Header>
//         <h2>📦 Orders</h2>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
//           <TextField
//             select
//             label="Filter by Status"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             size="small"
//             sx={{ width: 250 }}
//           >
//             <MenuItem value="">All Statuses</MenuItem>
//             <MenuItem value="Drafted">Drafted</MenuItem>
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="readytoship">Ready to Ship</MenuItem>
//             <MenuItem value="shipped">Shipped</MenuItem>
//             <MenuItem value="delivered">Delivered</MenuItem>
//             <MenuItem value="cancelled">Cancelled</MenuItem>
//           </TextField>
//         </Box>
//         <AddButton onClick={() => navigate('/Admin/addorder')}>+ Add Order</AddButton>
//       </Header>


//       {renderTable()}

//       {/* ✅ View Dialog */}
//       <Dialog open={!!viewOrder} onClose={() => setViewOrder(null)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontWeight: 600, position: 'relative' }}>
//           Order Details
//           <IconButton
//             onClick={() => setViewOrder(null)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           {viewOrder && (
//             <Grid container spacing={2}>
//               {[
//                 { label: 'Order ID', key: 'orderId' },
//                 { label: 'Pickup Pincode', key: 'pickupPincode' },
//                 { label: 'Delivery Pincode', key: 'deliveryPincode' },
//                 { label: 'Weight (kg)', key: 'weight' },
//                 { label: 'Quantity', key: 'qty' },
//                 { label: 'Length (cm)', key: 'length' },
//                 { label: 'Width (cm)', key: 'width' },
//                 { label: 'Height (cm)', key: 'height' },
//                 { label: 'Payment Mode', key: 'paymentMode' },
//                 { label: 'Invoice Value (₹)', key: 'invoiceValue', isCurrency: true },
//                 { label: 'Insurance', key: 'insurance', isBoolean: true },
//                 { label: 'Appointment Delivery', key: 'appointmentDelivery', isBoolean: true },
//                 { label: 'Zone', key: 'zone' },
//                 { label: 'Courier Company', key: 'selectedCourierCompany' },
//                 { label: 'Final Rate (₹)', key: 'finalRate', isCurrency: true },
//                 { label: 'Status', key: 'status' },
//               ].map(({ label, key, isBoolean, isCurrency }) => (
//                 <Grid item xs={12} sm={6} md={4} key={key}>
//                   <Box
//                     sx={{
//                       border: '1px solid #e0e0e0',
//                       borderRadius: 2,
//                       p: 2,
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       fontWeight={500}
//                       gutterBottom
//                     >
//                       {label}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       fontWeight={600}
//                       color="text.primary"
//                     >
//                       {isBoolean
//                         ? viewOrder[key]
//                           ? 'Yes'
//                           : 'No'
//                         : isCurrency
//                           ? `₹${parseFloat(viewOrder[key] || 0).toFixed(2)}`
//                           : viewOrder[key] ?? 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </DialogContent>
//       </Dialog>


//       {/* ✅ Edit Dialog */}
//       <Dialog open={!!editOrder} onClose={() => setEditOrder(null)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontWeight: 600, position: 'relative' }}>
//           Edit Order
//           <IconButton
//             onClick={() => setEditOrder(null)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           {editOrder && (
//             <Grid container spacing={2}>
//               {[
//                 'pickupPincode', 'deliveryPincode', 'weight', 'qty', 'length',
//                 'width', 'height', 'paymentMode', 'invoiceValue', 'zone',
//                 'finalRate', 'selectedCourierCompany'
//               ].map((name) => (
//                 <Grid item xs={12} sm={6} key={name}>
//                   <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//                     <Typography variant="body2" fontWeight={500} mb={1}>
//                       {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                     </Typography>
//                     <TextField
//                       name={name}
//                       value={editedValues[name] ?? ''}
//                       onChange={handleChange}
//                       fullWidth
//                       size="small"
//                     />
//                   </Box>
//                 </Grid>
//               ))}

//               {/* Status Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//                   <Typography variant="body2" fontWeight={500} mb={1}>Status</Typography>
//                   <TextField
//                     select
//                     name="status"
//                     value={editedValues.status ?? ''}
//                     onChange={handleChange}
//                     fullWidth
//                     size="small"
//                   >
//                     <MenuItem value="Drafted">Drafted</MenuItem>
//                     <MenuItem value="pending">Pending</MenuItem>
//                     <MenuItem value="readytoship">Ready to Ship</MenuItem>
//                     <MenuItem value="shipped">Shipped</MenuItem>
//                     <MenuItem value="delivered">Delivered</MenuItem>
//                     <MenuItem value="cancelled">Cancelled</MenuItem>
//                   </TextField>
//                 </Box>
//               </Grid>

//               {/* Boolean Fields: Insurance & Appointment Delivery */}
//               {['insurance', 'appointmentDelivery'].map((name) => (
//                 <Grid item xs={12} sm={6} key={name}>
//                   <Box
//                     sx={{
//                       border: '1px solid #e0e0e0',
//                       borderRadius: 2,
//                       p: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name={name}
//                           checked={!!editedValues[name]}
//                           onChange={handleChange}
//                         />
//                       }
//                       label={
//                         <Typography variant="body2" fontWeight={500}>
//                           {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                         </Typography>
//                       }
//                     />
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </Wrapper>
//   );
// };

// export default ShowOrders;





import React, { useEffect, useState } from 'react';
import {
  TableHead, TableRow, TableCell, TableBody,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, Typography, Checkbox, FormControlLabel,
  CircularProgress, Box, MenuItem
} from '@mui/material';
import { Edit, Delete, Visibility, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, updateOrder } from '../../../redux/orderRelated/orderHandel';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderTitle = styled.h2`
  flex-shrink: 0;
  margin: 0;
`;

const HeaderFilterWrapper = styled.div`
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddButton = styled.button`        
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoaderContainer = styled.div`           
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  /* ensure horizontal scrolling on small screens */
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    white-space: nowrap;
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

const ShowOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [statusFilter, setStatusFilter] = useState('');

  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then(() => dispatch(getAllOrders()));
  };

  const handleEditClick = (order) => {
    setEditOrder(order);
    setEditedValues(order);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  const handleUpdateSubmit = async () => {
    try {
      await dispatch(updateOrder({ id: editOrder._id, updatedData: editedValues }));
      setEditOrder(null);
      dispatch(getAllOrders());
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const renderTable = () => {
    if (loading) return <LoaderContainer><CircularProgress /></LoaderContainer>;
    if (error) return <p>Error: {error}</p>;
    if (!Array.isArray(orders) || orders.length === 0) return <p>No orders found.</p>;

    return (
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Pickup Pincode</TableCell>
              <TableCell>Delivery Pincode</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Courier Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.pickupPincode}</TableCell>
                <TableCell>{order.deliveryPincode}</TableCell>
                <TableCell>{order.weight}</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell>{order.selectedCourierCompany}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setViewOrder(order)}><Visibility color="primary" /></IconButton>
                  <IconButton onClick={() => handleEditClick(order)}><Edit color="secondary" /></IconButton>
                  <IconButton onClick={() => handleDelete(order._id)}><Delete color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    );
  };

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>📦 Orders</HeaderTitle>

        <HeaderFilterWrapper>
          <TextField
            select
            
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Drafted">Drafted</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="readytoship">Ready to Ship</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </HeaderFilterWrapper>



        <AddButton onClick={() => navigate('/Admin/addorder')}>+ Add Order</AddButton>
      </Header>

      {renderTable()}


      {/* ✅ View Dialog */}
      <Dialog open={!!viewOrder} onClose={() => setViewOrder(null)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 600, position: 'relative' }}>
          Order Details
          <IconButton
            onClick={() => setViewOrder(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {viewOrder && (
            <Grid container spacing={2}>
              {[
                { label: 'Order ID', key: 'orderId' },
                { label: 'Pickup Pincode', key: 'pickupPincode' },
                { label: 'Delivery Pincode', key: 'deliveryPincode' },
                { label: 'Weight (kg)', key: 'weight' },
                { label: 'Quantity', key: 'qty' },
                { label: 'Length (cm)', key: 'length' },
                { label: 'Width (cm)', key: 'width' },
                { label: 'Height (cm)', key: 'height' },
                { label: 'Payment Mode', key: 'paymentMode' },
                { label: 'Invoice Value (₹)', key: 'invoiceValue', isCurrency: true },
                { label: 'Insurance', key: 'insurance', isBoolean: true },
                { label: 'Appointment Delivery', key: 'appointmentDelivery', isBoolean: true },
                { label: 'Zone', key: 'zone' },
                { label: 'Courier Company', key: 'selectedCourierCompany' },
                { label: 'Final Rate (₹)', key: 'finalRate', isCurrency: true },
                { label: 'Status', key: 'status' },
              ].map(({ label, key, isBoolean, isCurrency }) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={500}
                      gutterBottom
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {isBoolean
                        ? viewOrder[key]
                          ? 'Yes'
                          : 'No'
                        : isCurrency
                          ? `₹${parseFloat(viewOrder[key] || 0).toFixed(2)}`
                          : viewOrder[key] ?? 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>


      {/* ✅ Edit Dialog */}
      <Dialog open={!!editOrder} onClose={() => setEditOrder(null)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 600, position: 'relative' }}>
          Edit Order
          <IconButton
            onClick={() => setEditOrder(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {editOrder && (
            <Grid container spacing={2}>
              {[
                'pickupPincode', 'deliveryPincode', 'weight', 'qty', 'length',
                'width', 'height', 'paymentMode', 'invoiceValue', 'zone',
                'finalRate', 'selectedCourierCompany'
              ].map((name) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                    <Typography variant="body2" fontWeight={500} mb={1}>
                      {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>
                    <TextField
                      name={name}
                      value={editedValues[name] ?? ''}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
              ))}

              {/* Status Dropdown */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                  <Typography variant="body2" fontWeight={500} mb={1}>Status</Typography>
                  <TextField
                    select
                    name="status"
                    value={editedValues.status ?? ''}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="Drafted">Drafted</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="readytoship">Ready to Ship</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </TextField>
                </Box>
              </Grid>

              {/* Boolean Fields: Insurance & Appointment Delivery */}
              {['insurance', 'appointmentDelivery'].map((name) => (
                <Grid item xs={12} sm={6} key={name}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={name}
                          checked={!!editedValues[name]}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <Typography variant="body2" fontWeight={500}>
                          {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Typography>
                      }
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 , justifyContent: 'center', pb: 2 }} >
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

    </Wrapper>
  );
};

export default ShowOrders;


