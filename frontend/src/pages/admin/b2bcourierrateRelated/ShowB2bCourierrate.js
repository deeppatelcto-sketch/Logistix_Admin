import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourierRates, deleteCourierRate } from '../../../redux/b2bcourierrateRelated/b2bcourierrateHandel';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, Button, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const ShowB2BCourierRates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courierRates, loading } = useSelector((state) => state.b2bcourierRate);                     

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showB2B, setShowB2B] = useState(true);

  useEffect(() => {
    dispatch(getAllCourierRates());
  }, [dispatch]);

  const handleView = (rate) => {
    setSelectedRate(rate);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedRate(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rate?')) {
      dispatch(deleteCourierRate(id));
    }
  };

  const handleToggleClick = (type) => {
    if (type === 'b2c') {
      setShowB2B(false);
      navigate('/Admin/courierrates');
    } else {
      setShowB2B(true);
      navigate('/Admin/b2bcourierrates');
    }
  };

  const filteredRates = courierRates?.filter((rate) =>
    rate.courierName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <ToggleWrapper>
        <ToggleOption active={!showB2B} onClick={() => handleToggleClick('b2c')}>
          B2C
        </ToggleOption>
        <ToggleOption active={showB2B} onClick={() => handleToggleClick('b2b')}>
          B2B
        </ToggleOption>
      </ToggleWrapper>

      <Header>
        <h2>📦 B2B Courier Rate Management</h2>

        <CenterBox>
          <SearchInputWrapper>
            <SearchIconStyled />
            <StyledSearchInput
              type="text"
              placeholder="Search by Courier Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputWrapper>
        </CenterBox>

        <ButtonGroup>
          <AddButton onClick={() => navigate('/Admin/addb2bcourierrate')}>
            + Add B2B Courier Rate
          </AddButton>
          <AddButton onClick={() => navigate('/Admin/addb2bcourierrateCSV')}>
            + Add B2B Courier Rate CSV File
          </AddButton>
        </ButtonGroup>
      </Header>

      {loading ? (
        <LoaderContainer><CircularProgress /></LoaderContainer>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Courier Name</th>
              <th>Fuel</th>
              <th>Min Weight</th>
              <th>Min Charge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.map((rate) => (
              <tr key={rate._id}>
                <td>{rate.courierName}</td>
                <td>{rate.overheads?.fuel}</td>
                <td>{rate.overheads?.minWeight}</td>
                <td>{rate.overheads?.minCharge}</td>
                <td>
                  <IconButton onClick={() => handleView(rate)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(rate._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </td>

              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Rate Details - {selectedRate?.courierName}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Overheads</Typography>
          <ul>
            {selectedRate && Object.entries(selectedRate.overheads || {}).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>

          <Typography variant="h6">ODA Matrix</Typography>
          <ul>
            {selectedRate?.odaMatrix?.map((item, index) => (
              <li key={index}>{item.distanceRange} | {item.weightRange} | ₹{item.charge}</li>
            ))}
          </ul>

          <Typography variant="h6">Zone Rates</Typography>
          <ul>
            {selectedRate?.zoneRates?.map((item, index) => (
              <li key={index}>{item.fromZone} → {item.toZone}: ₹{item.rate}</li>
            ))}
          </ul>

          <Box mt={2}>
            <Button onClick={handleClose} variant="outlined">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

export default ShowB2BCourierRates;

// Styled Components
const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
    min-height: 100vh;
  
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 20px;
  user-select: none;
`;

const ToggleOption = styled.div`
  cursor: pointer;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 30px;
  border: 2px solid #1976d2;
  color: ${props => (props.active ? 'white' : '#1976d2')};
  background-color: ${props => (props.active ? '#1976d2' : 'transparent')};
  box-shadow: ${props => (props.active ? '0 4px 12px rgba(25, 118, 210, 0.4)' : 'none')};
  transition: all 0.3s ease;

  &:hover {
    background-color: #1565c0;
    color: white;
    box-shadow: 0 4px 12px rgba(21, 101, 192, 0.6);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 12px;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);

  &:focus-within {
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
  }
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  padding-left: 8px;
`;

const SearchIconStyled = styled(SearchIcon)`
  color: #1976d2;
`;


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;

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

