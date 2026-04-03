import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledContainer = styled(Box)({
  backgroundColor: "#f9fbfd",
  minHeight: "100vh",
  padding: "40px",
  "@media (max-width: 600px)": {
    padding: "20px"
  }
});

const StyledTitle = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold",
  color: "#4A90E2",
  marginBottom: "24px",
  fontSize: "24px"
});

const StyledBox = styled(Box)({
  background: "linear-gradient(to bottom right, #eaf3ff, #cbdcf9)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
  "@media (max-width: 600px)": {
    padding: "20px"
  }
});

const Row = styled(Paper)({
  backgroundColor: "#ffffff",
  border: "1px solid #e0e7ff",
  borderRadius: "12px",
  padding: "16px 24px",
  marginBottom: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap", // ✅ Make items wrap on small screens
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  transition: "0.2s ease",
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.08)"
  }
});

const LogoName = styled("div")({
  fontWeight: "bold",
  fontSize: "16px",
  color: "#374151",
  marginBottom: "4px",
  "@media (max-width: 400px)": {
    width: "100%"
  }
});

const ID = styled("div")({
  fontFamily: "monospace",
  fontSize: "15px",
  color: "#1f2937",
  wordBreak: "break-word", // ✅ Prevents overflow
  "@media (max-width: 400px)": {
    width: "100%"
  }
});

const FooterImage = styled("img")({
  marginTop: "32px",
  width: "200px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto"
});

const transporterData = [
  { name: "DELHIVERY", id: "06AAPCS9575E1ZR" },
  { name: "TRUXCARGO", id: "07AAJCT0667J1Z0" },
  { name: "GATI", id: "36AADC92096A1ZY" },
  { name: "OxyZEN", id: "88AADC05675P1ZU" },
  { name: "DTDC", id: "88AAACD8017H1ZX" },
  { name: "Smartr", id: "88ABBCS3441C1ZQ" },
  { name: "RIVIGO", id: "27AACCV3947L1ZU" },
  { name: "eKart", id: "07AADCI8374D2ZH" },
  { name: "Ecom Express", id: "07AADCE1344F1Z2" },
  { name: "BLUE DART", id: "27AAACB0446L1ZS" }
];

const TransporterIDs = () => {
  return (
    <StyledContainer>
      <StyledTitle>Transporter IDs</StyledTitle>

      <StyledBox>
        <Typography sx={{ color: "#374151", mb: 3 }}>
          While creating an E-waybill, make sure to enter the transporter ID of the respective shipping partner.
        </Typography>

        <Grid container spacing={2}>
          {transporterData.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Row>
                <LogoName>{item.name}</LogoName>
                <ID>{item.id}</ID>
              </Row>
            </Grid>
          ))}
        </Grid>
      </StyledBox>
    </StyledContainer>
  );
};

export default TransporterIDs;
