import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllKYCRequests,
  updateKYCStatus,
  deleteKYCRequest
} from '../../../redux/kycRelated/kycHandel';
import { getAllCourierCompanies } from '../../../redux/couriercompanyRelated/couriercompanyHandle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;  /* prevent wrapping on large screens */
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    /* Ensure button full width and left aligned */
    button {
      width: 100%;
      margin-top: 10px; /* some spacing below title */
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;   /* enable horizontal scroll on small screens */
  margin-top: 30px;
  
  /* Prevent table rows from wrapping */
  table {
    min-width: 800px; /* keep minimum width for table */
    border-collapse: collapse;
  }
`;

// No change to Table styles except ensure minimum width to avoid wrapping inside rows
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  min-width: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    white-space: nowrap;  /* prevent cell content wrap */
  }

  th {
    background-color: #f1f3f5;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f8f9fa;
  }

  a {
    color: #1976d2;
    text-decoration: none;
    font-weight: 500;
  }
`;


const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;




const StatusText = styled.span`
  font-weight: 600;
  color: ${(props) =>
    props.status === 'Approved'
      ? 'green'
      : props.status === 'Rejected'
      ? 'red'
      : '#555'};
`;

// const StatusSelect = styled.select`
//   padding: 6px 10px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
//   font-size: 14px;
//   margin-right: 8px;
//   cursor: pointer;
//   background-color: #f8f9fa;
//   color: ${({ value }) =>
//     value === 'Approved'
//       ? 'green'
//       : value === 'Rejected'
//       ? 'red'
//       : '#343a40'};

//   &:hover {
//     border-color: #1976d2;
//   }

//   &:focus {
//     outline: none;
//     border-color: #1976d2;
//   }
// `;


const StatusSelect = styled.select`
  padding: 6px 30px 6px 10px; /* extra right padding for arrow */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-right: 8px;
  cursor: pointer;
  background-color: #f8f9fa;
  color: ${({ value }) =>
    value === 'Approved'
      ? 'green'
      : value === 'Rejected'
      ? 'red'
      : '#343a40'};

  /* ✅ remove default browser arrow */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* ✅ add custom dropdown arrow */
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23343a40' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:hover {
    border-color: #1976d2;
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;


const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const ShowKYCRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { kycs, loading } = useSelector((state) => state.kyc);
  const { courierCompanies } = useSelector((state) => state.couriercompany);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllKYCRequests());
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await dispatch(updateKYCStatus({ id, status: newStatus }));
      if (result.meta.requestStatus === 'fulfilled') {
        setSnackbarMessage('✅ Status updated successfully!');
        setSnackbarSeverity('success');
        dispatch(getAllKYCRequests());
      } else {
        throw new Error();
      }
    } catch {
      setSnackbarMessage('❌ Failed to update status.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const getCompanyName = (mobile) => {
    const company = courierCompanies?.find((c) => c.contactNo === mobile);
    return company?.companyName || '—';
  };

  const openConfirmDialog = (id) => {
    setConfirmDeleteId(id);
  };

  const closeConfirmDialog = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      const result = await dispatch(deleteKYCRequest(confirmDeleteId));
      if (result.meta.requestStatus === 'fulfilled') {
        setSnackbarMessage('✅ KYC deleted successfully!');
        setSnackbarSeverity('success');
        dispatch(getAllKYCRequests());
      } else {
        throw new Error();
      }
    } catch {
      setSnackbarMessage('❌ Failed to delete KYC.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      closeConfirmDialog();
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const totalPages = Math.ceil(kycs.length / itemsPerPage);
  const paginatedKycs = kycs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Wrapper>
      <Header>
        <h2>🧾 International KYC</h2>
        <AddButton onClick={() => navigate('/Admin/KYCForm')}>+ Add KYC Request</AddButton>
      </Header>

      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Mobile No</th>
                  <th>Company Name</th>
                  <th>Org Type</th>
                  <th>Doc 1</th>
                  <th>Doc 2</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedKycs.map((kyc) => (
                  <tr key={kyc._id}>
                    <td>{kyc.consignerMobileNo}</td>
                    <td>{getCompanyName(kyc.consignerMobileNo)}</td>
                    <td>{kyc.organizationType}</td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${kyc.documentOne.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/${kyc.documentTwo.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <StatusText status={kyc.status}>{kyc.status}</StatusText>
                    </td>
                    <td>
                      <StatusSelect
                        value={kyc.status}
                        onChange={(e) => handleStatusChange(kyc._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Applied">Applied</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </StatusSelect>
                      <IconButton onClick={() => openConfirmDialog(kyc._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {totalPages > 1 && (
            <PaginationWrapper>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
                size="medium"
              />
            </PaginationWrapper>
          )}
        </>
      )}

      <Dialog open={!!confirmDeleteId} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this KYC request?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            fontWeight: 500,
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ShowKYCRequests;
