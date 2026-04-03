import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

// MUI Icons
import DangerousIcon from '@mui/icons-material/Dangerous';
import BlockIcon from '@mui/icons-material/Block';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import GavelIcon from '@mui/icons-material/Gavel';
import ScienceIcon from '@mui/icons-material/Science';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FlareIcon from '@mui/icons-material/Flare';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import CategoryIcon from '@mui/icons-material/Category';

const prohibitedItems = [
  { icon: GavelIcon, text: ["Precious stones", "Gems", "Jewelry"] },
  { icon: BlockIcon, text: ["Uncrossed (bearer cheques)", "Drafts/cheques", "Currency and coins"] },
  { icon: DangerousIcon, text: ["Poison"] },
  { icon: LocalPoliceIcon, text: ["Firearms", "Explosives", "Military equipment"] },
  { icon: ScienceIcon, text: ["Oil-based paint", "Thinners (flammable liquids)", "Industrial solvents"] },
  { icon: FlareIcon, text: ["Insecticides", "Garden chemicals (fertilizers, poisons)"] },
  { icon: PrecisionManufacturingIcon, text: ["Machinery (chain saws, engines containing or that contained fuel)"] },
  { icon: WhatshotIcon, text: ["Fuel for camp stoves", "Lanterns", "Torches or heating elements"] },
  { icon: WarningAmberIcon, text: ["Any compound, liquid or gas that has toxic characteristics"] },
  { icon: BatteryAlertIcon, text: ["Automobile batteries", "Lithium batteries"] },
  { icon: GavelIcon, text: ["Arms and ammunitions", "Lithium batteries"] },
  { icon: ScienceIcon, text: ["Dry ice (carbon dioxide, solid)"] },
  { icon: CategoryIcon, text: ["Magnetized materials", "Infectious substances", "Bleach", "Flammable adhesives"] }
];

// Styled Components
const StyledBox = styled(Box)({
  background: "linear-gradient(to bottom right, #eaf3ff, #cbdcf9)",
  borderRadius: "16px",
  padding: "32px",
  marginTop: "20px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.05)"
});

const StyledItem = styled(Paper)({
  backgroundColor: "#ffffff",
  border: "1px solid #e0e7ff",
  borderRadius: "16px",
  padding: "20px",
  textAlign: "left",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: "12px",
  transition: "0.2s ease",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.08)"
  }
});

const IconBox = styled(Box)({
  fontSize: "64px", // increased icon size
  color: "#4A90E2",
  display: "flex",
  alignItems: "center"
});

const ProhibitedItems = () => {
  return (
    <Box sx={{ padding: "40px", backgroundColor: "#f9fbfd", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#4A90E2",
          mb: 3
        }}
      >
        Prohibited Items
      </Typography>

      <StyledBox>
        <Grid container spacing={3}>
          {prohibitedItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <StyledItem>
                  <IconBox>
                    <IconComponent fontSize="inherit" />
                  </IconBox>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {item.text.map((line, i) => (
                      <li key={i} style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6" }}>
                        {line}
                      </li>
                    ))}
                  </ul>
                </StyledItem>
              </Grid>
            );
          })}
        </Grid>
      </StyledBox>
    </Box>
  );
};

export default ProhibitedItems;
