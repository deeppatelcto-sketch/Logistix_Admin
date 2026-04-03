import React from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from "@mui/material";
import { styled } from "@mui/system";

// Sample data
const escalationData = {
  sales: {
    title: "Sales Escalation Matrix",
    rows: [
      { name: "Seetal", number: "8448086821", email: "seetal.rajput@truxcargo.com" },
    ],
  },
  operations: {
    title: "Operations Escalation Matrix",
    escalations: [
      {
        level: "Escalation 1",
        rows: [
          { name: "Veeru Kumar", dept: "B2C + B2B Connection", number: "9315033113", email: "veeru@truxcargo.com" },
          { name: "Naushad Ali", dept: "B2C FM", number: "7016895688", email: "naushad.ali@truxcargo.com" },
          { name: "Vishal Dhyani", dept: "B2C LM", number: "7428984780", email: "vishal.dhyani@truxcargo.com" },
        ]
      },
      {
        level: "Escalation 2",
        rows: [
          { name: "Deepak Agnihotri", number: "8448199928", email: "deepak.agnihotri@truxcargo.com" }
        ]
      },
      {
        level: "Escalation 3",
        rows: [
          { name: "Adarsh Sharma", number: "9266766948", email: "adarsh.sharma@truxcargo.com" }
        ]
      }
    ]
  },
  weight: {
    title: "Weight Dispute Escalation Matrix",
    escalations: [
      {
        level: "Escalation 1",
        rows: [
          { name: "Manmohan Singh", number: "8448199926", email: "manmohan.singh@truxcargo.com" }
        ]
      },
      {
        level: "Escalation 2",
        rows: [
          { name: "Arun Mangotra", number: "9599470751", email: "arun.mangotra@truxcargo.com" }
        ]
      }
    ]
  },
  billing: {
    title: "Account/Billing Escalation Matrix",
    escalations: [
      {
        level: "Escalation 1",
        rows: [
          { name: "Amit Rawat", number: "8448086807", email: "amit.rawat@truxcargo.com" }
        ]
      },
      {
        level: "Escalation 2",
        rows: [
          { name: "Vikas Kumar", number: "8448199930", email: "vikas.kumar@truxcargo.com" }
        ]
      }
    ]
  },
  technical: {
    title: "Technical Escalation Matrix",
    escalations: [
      {
        level: "Escalation 1",
        rows: [
          { name: "Kavita Sharma", email: "kavita.sharma@truxcargo.com" }
        ]
      }
    ]
  }
};

// Styled components
const SectionContainer = styled(Paper)({
  padding: "24px",
  marginBottom: "32px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0"
});

const HeaderBar = styled(Box)({
  backgroundColor: "#4A90E2",
  color: "#ffffff",
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: "1rem"
});

const MatrixTable = styled(Table)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minWidth: 600
}));

const EscalationMatrixPage = () => {
  return (
    <Box sx={{ backgroundColor: "#f7f9fc", minHeight: "100vh", pt: 5 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "#4A90E2", textAlign: "center", mb: 4, fontWeight: 600 }}>
          Escalation Matrix
        </Typography>

        {/* ✅ Updated Sales Section with scroll fix */}
        <SectionContainer elevation={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>{escalationData.sales.title}</Typography>
          <HeaderBar>Name / Number / Email ID</HeaderBar>
          <Box sx={{ overflowX: "auto" }}>
            <MatrixTable size="small">
              <TableBody>
                {escalationData.sales.rows.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.number}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{r.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MatrixTable>
          </Box>
        </SectionContainer>

        {/* Other matrices */}
        {["operations", "weight", "billing", "technical"].map((key) => {
          const data = escalationData[key];
          return (
            <SectionContainer elevation={0} key={key}>
              <Typography variant="h6" sx={{ mb: 2 }}>{data.title}</Typography>
              {data.escalations.map((group, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <HeaderBar>{group.level}</HeaderBar>
                  <TableContainer sx={{ overflowX: "auto" }}>
                    <MatrixTable size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          {group.rows[0].dept && <TableCell>Department</TableCell>}
                          {group.rows[0].number && <TableCell>Number</TableCell>}
                          <TableCell>Email ID</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.rows.map((r, i2) => (
                          <TableRow key={i2}>
                            <TableCell>{r.name}</TableCell>
                            {r.dept && <TableCell>{r.dept}</TableCell>}
                            {r.number && <TableCell>{r.number}</TableCell>}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>{r.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </MatrixTable>
                  </TableContainer>
                </Box>
              ))}
            </SectionContainer>
          );
        })}
      </Container>
    </Box>
  );
};

export default EscalationMatrixPage;
