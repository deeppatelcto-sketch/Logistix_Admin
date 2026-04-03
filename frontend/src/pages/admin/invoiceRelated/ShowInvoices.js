import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateCourierInvoices } from '../../../redux/invoiceRelated/invoiceHandel';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f3f3f3;
  }
`;

const BottomMessage = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  text-align: center;
  color: ${({ error }) => (error ? '#d32f2f' : '#2e7d32')};
`;

const ShowInvoices = () => {
  const dispatch = useDispatch();
  const { loading, invoices, error } = useSelector(state => state.invoice);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      dispatch(generateCourierInvoices(from, to)).then((res) => {
        if (res?.payload?.length > 0) {      
          setSuccessMessage("Invoices generated successfully ✅");
          setTimeout(() => setSuccessMessage(""), 2500);
        }
      });
    } else {
      alert("Please select both From and To dates");
    }
  };

  return (
    <Container>
      <Title>Generate Courier Company Invoices</Title>

      <Form onSubmit={handleSubmit}>
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} required />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </Form>

      {error && <BottomMessage error>{error}</BottomMessage>}
      {successMessage && <BottomMessage>{successMessage}</BottomMessage>}

      {invoices.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Courier Name</th>
              <th>Invoice File Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, index) => (
              <tr key={index}>
                <td>{inv.courier}</td>
                <td>{inv.fileName}</td>
                <td>
                  <a href={inv.downloadLink} target="_blank" rel="noopener noreferrer">
                    <Button>Download PDF</Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ShowInvoices;    



