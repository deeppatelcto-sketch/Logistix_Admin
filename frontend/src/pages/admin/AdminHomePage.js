import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Switch,
  Divider,
  Stack
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  North,
  South,
  East,
  West,
  FlightTakeoff,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderCount } from "../../redux/orderRelated/orderHandel";
import { fetchDashboardStats } from "../../redux/orderRelated/orderHandel";


// Chart styles
const chartColors = ['#5D9CEC', '#D3D3D3', '#A9A9A9'];

const ChartWrapper = styled(Box)`
  position: relative;
  width: 140px;
  height: 140px; 
  border-radius: 50%;
  background: ${({ data }) => {
    const total = data.reduce((a, b) => a + b.value, 0);
    let angle = 0;
    return `conic-gradient(${data
      .map((d, i) => {
        const start = angle;
        const deg = (d.value / total) * 360;
        angle += deg;
        return `${chartColors[i]} ${start}deg ${start + deg}deg`;
      })
      .join(', ')})`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled(Box)`
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
`;

const LabelDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${(props) => props.color};
`;

// const StatCard = styled(Card)`
//   min-width: 100px;
//   text-align: center;
//   box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
// `;

// const ModeBox = styled(Box)`
//   background: #fff;
//   border-radius: 10px;
//   padding: 10px;
//   text-align: center;
//   box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
//   width: 100%;
// `;

// Donut Chart
const DonutChart = ({ data, title }) => {
  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <ChartWrapper data={data}>
        <InnerCircle>
          {total}
          <br />
          {title}
        </InnerCircle>
      </ChartWrapper>
      <Box>
        {data.map((item, i) => (
          <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
            <LabelDot color={chartColors[i]} />
            <Typography variant="body2" color="textSecondary">
              {item.label}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Latest Orders
const orders = [
  { id: '221222', consignee: 'MR. Harshil Patel\nAhmedabad, Gujarat', date: '21 Feb, 2025', status: 'Manifested' },
  { id: '221221', consignee: 'MR. Suman Patel\nSurat, Gujarat', date: '16 Feb, 2025', status: 'Delivered' },
  { id: '221220', consignee: 'MR. Aman Patel\nRajkot, Gujarat', date: '11 Feb, 2025', status: 'Delivered' },
  { id: '221219', consignee: 'MR. Raj Patel\nKatch, Gujarat', date: '08 Feb, 2025', status: 'Delivered' },
];

// Shipment Overview Section
const ShipmentOverview = () => {

    const { dashboard } = useSelector((state) => state.order);

  const {
    revenue = {},
    orderPerformance = {},
    weightSummary = {},
    zoneWeight = {},
  } = dashboard || {};


  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              p: 2,
              height: "100%",
              bgcolor: "#fdfdfd",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
                  Order Performance
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
                  Order Revenue
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
                  Weight
                </Typography>
              </Grid>

              <Divider sx={{ width: "100%", my: 1 }} />

              {[
                ["Manifested", orderPerformance?.manifested || 0, "This Week", `₹${(revenue?.totalRevenue || 0).toFixed(2)}`, "This Week", `${weightSummary?.thisWeek || 0} Kg`],
                ["In-Transit", orderPerformance?.inTransit || 0, "This Month", `₹${(revenue?.prepaid || 0).toFixed(2)}`, "This Month", `${weightSummary?.thisMonth || 0} Kg`],
                ["Pending", orderPerformance?.pending || 0, "Last 3 Month", `₹${(revenue?.toPay || 0).toFixed(2)}`, "Last 3 Month", `${weightSummary?.last3Month || 0} Kg`],
                ["Delivered", orderPerformance?.delivered || 0, "", "", "", ""],
                ["RTO", orderPerformance?.rto || 0, "", "", "", ""],
              ]
                .map(([label, value, time1, val1, time2, val2], idx) => (
                  <React.Fragment key={idx}>
                    <Grid item xs={4}>
                      <Box p={0.5}>
                        <Typography fontWeight={600} fontSize="0.95rem">{label}</Typography>
                        <Typography variant="caption" color="text.secondary">{value}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      {time1 && (
                        <Box p={0.5}>
                          <Typography variant="caption" color="text.secondary">
                            {time1}
                          </Typography>
                          <Typography fontWeight={500} color="success.main" fontSize="0.9rem">
                            {val1}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      {time2 && (
                        <Box p={0.5}>
                          <Typography variant="caption" color="text.secondary">
                            {time2}
                          </Typography>
                          <Typography fontWeight={500} color="success.main" fontSize="0.9rem">
                            {val2}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
            </Grid>
          </Paper>
        </Grid>


        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, height: "100%", bgcolor: "#fcfcfc", borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="subtitle1" fontWeight={700}>
                Total Shipment Weight – Feb
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="caption">Report</Typography>
                <Switch size="small" />
              </Box>
            </Box>

            <Grid container spacing={2} px={1}>
              {[
                { dir: "North", weight: `${zoneWeight?.north || 0} kg` },
                { dir: "West", weight: `${zoneWeight?.west || 0} kg` },
                { dir: "South", weight: `${zoneWeight?.south || 0} kg` },
                { dir: "East", weight: `${zoneWeight?.east || 0} kg` },
                { dir: "Flight", weight: `${zoneWeight?.flight || 0} kg` },
              ]
                .map((item, idx) => (
                  <Grid
                    item
                    xs={idx === 4 ? 12 : 6}
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      p={1.5}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        backgroundColor: "#f5faff",
                        width: "100%",
                        height: "95px",
                        maxWidth: 200,
                        mx: "auto",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={0.5}
                        color="text.secondary"
                      >
                        {item.icon}
                        {item.dir}
                      </Typography>
                      <Typography variant="body1" fontWeight={700} color="primary.main">
                        {item.weight}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};



const shipmentData = [
  { courier: 'DELHIVERY B2B', manifested: 3, inTransit: 2, pending: 0, ofd: 0, delivered: 13, rto: 0, lost: 0, total: 18 },
  { courier: 'DELHIVERY B2B', manifested: 0, inTransit: 6, pending: 1, ofd: 4, delivered: 322, rto: 1, lost: 0, total: 334 },
  { courier: 'AMAZONE', manifested: 1, inTransit: 1, pending: 0, ofd: 0, delivered: 16, rto: 0, lost: 0, total: 19 },
  { courier: 'DTDC', manifested: 2, inTransit: 0, pending: 0, ofd: 0, delivered: 55, rto: 286, lost: 0, total: 343 },
  { courier: 'Ecom Express', manifested: 3, inTransit: 1, pending: 0, ofd: 0, delivered: 286, rto: 55, lost: 0, total: 345 },
  { courier: 'eKart', manifested: 0, inTransit: 2, pending: 0, ofd: 0, delivered: 16, rto: 23, lost: 0, total: 43 },
  { courier: 'Shree Maruti', manifested: 1, inTransit: 3, pending: 0, ofd: 0, delivered: 13, rto: 0, lost: 0, total: 18 },
  { courier: 'BLUE DART', manifested: 0, inTransit: 1, pending: 0, ofd: 0, delivered: 23, rto: 1, lost: 0, total: 25 },
];

// Table component
const ShipmentOverviewTable = () => {
  return (
    <Box mt={4}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
          borderColor: '#e0e0e0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            color: '#333',
          }}
        >
          Shipment Overview By Courier
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          This is the total weight of shipment in Feb month.
        </Typography>
        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f5f7fa',
                  '& th': {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#1976d2', // Blue color for header text

                    borderBottom: '1px solid #e0e0e0',
                  },
                }}
              >
                <TableCell>Courier Name</TableCell>
                <TableCell align="center">Manifested</TableCell>
                <TableCell align="center">In-Transit</TableCell>
                <TableCell align="center">Pending</TableCell>
                <TableCell align="center">OFD</TableCell>
                <TableCell align="center">Delivered</TableCell>
                <TableCell align="center">RTO</TableCell>
                <TableCell align="center">Lost</TableCell>
                <TableCell align="center">Total Shipment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipmentData.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9',
                    '& td': {
                      fontSize: '0.85rem',
                      color: '#444',
                      borderBottom: '1px solid #eee',
                    },
                  }}
                >
                  <TableCell>{row.courier}</TableCell>
                  <TableCell align="center">{row.manifested}</TableCell>
                  <TableCell align="center">{row.inTransit}</TableCell>
                  <TableCell align="center">{row.pending}</TableCell>
                  <TableCell align="center">{row.ofd}</TableCell>
                  <TableCell align="center">{row.delivered}</TableCell>
                  <TableCell align="center">{row.rto}</TableCell>
                  <TableCell align="center">{row.lost}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const barData = [
  { name: "Oct-25", B2B: 5, B2C: 0 },
  { name: "Nov-25", B2B: 10, B2C: 100 },
  { name: "Dec-25", B2B: 15, B2C: 300 },
  { name: "Jan-25", B2B: 15, B2C: 430 },
  { name: "Jan-25", B2B: 20, B2C: 120 },
];




const COLORS = [
  "#619ED8",
  "#F26938",
  "#FEBE5E",
  "#619ED8",
  "#619ED8",
  "#619ED8",
  "#619ED8",
];

const shippingData = [
  { courier: "DELHIVERY B2B", weight: "164 Kg" },
  { courier: "DELHIVERY B2C", weight: "200.3 Kg" },
  { courier: "Ecom Express", weight: "11.5 Kg" },
  { courier: "eKart", weight: "12.5 Kg" },
];

const DashboardOverview = () => {

  const { dashboard } = useSelector((state) => state.order);

  const { orderPerformance = {} } = dashboard || {};

  const pieData = [
    { name: "Delivered", value: orderPerformance?.delivered || 0 },
    { name: "RTO", value: orderPerformance?.rto || 0 },
    { name: "In Transit", value: orderPerformance?.inTransit || 0 },
    { name: "Manifested", value: orderPerformance?.manifested || 0 },
    { name: "Pending", value: orderPerformance?.pending || 0 },
  ];

  return (
    <Box p={4} sx={{ backgroundColor: "#f9f9f9", borderRadius: 3 }}>
      <Grid container spacing={3}>
        {/* Performance Report */}
        <Grid item xs={12} md={4}>
          <Card className="shadow-md rounded-xl">
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#4A90E2" }}
                gutterBottom
              >
                Performance Report
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                The total shipments during a user's active period on our
                website.
              </Typography>
              <ResponsiveContainer width="100%" height={195}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#8884d8" fontSize={12} />
                  <YAxis stroke="#8884d8" fontSize={12} />
                  <Tooltip />
                  <Bar
                    dataKey="B2B"
                    fill="#2F3A4C"
                    barSize={8}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="B2C"
                    fill="#619ED8"
                    barSize={8}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <Stack direction="row" spacing={2} mt={2}>
                <Box display="flex" alignItems="center">
                  <Box width={16} height={4} bgcolor="#2F3A4C" mr={1} />
                  <Typography variant="caption">B2B Shipment</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box width={16} height={4} bgcolor="#619ED8" mr={1} />
                  <Typography variant="caption">B2C Shipment</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Status Report */}
        <Grid item xs={12} md={4}>
          <Card className="shadow-md rounded-xl">
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#4A90E2" }}
                gutterBottom
              >
                Order Status Report
              </Typography>
              <Box sx={{ width: "100%", height: 275, position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={85}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{ fontSize: 10 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Load Against Shipping Partners */}
        <Grid item xs={12} md={4}>
          <Card className="shadow-md rounded-xl">
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#4A90E2" }}
                gutterBottom
              >
                Load Against Shipping Partners
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This is the total weight of shipments in Feb Month.
              </Typography>
              <Stack spacing={2} mt={2}>
                {shippingData.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: "#F5FAFF",
                      p: 1.5,
                      px: 2,
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "cursive",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: "#497CBB",
                    }}
                  >
                    <span>{item.courier}</span>
                    <span>{item.weight}</span>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}



const DashboardSummary = () => {
  const dispatch = useDispatch();
  const { orderCount, dashboard } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderCount());
    dispatch(fetchDashboardStats());
  }, [dispatch]);


  const {
    total = 0,
    pending = 0,
    readytoship = 0,
    shipped = 0,
    delivered = 0,
    cancelled = 0,
  } = orderCount || {};

    const { revenue = {} } = dashboard || {};


  

  return (
    <Box p={3} sx={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Stat Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {[
              { label: "Total Orders", value: total },
              { label: "Ready to Ship", value: readytoship },
              { label: "Pending Shipment", value: pending },
              { label: "Shipped", value: shipped },
              { label: "Delivered", value: delivered },
              { label: "Cancelled", value: cancelled },
            ].map((stat, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: 3,
                    p: 3,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    {stat.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Donut Charts */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <DonutChart
                  title="Shipment Status"
                  data={[
                    { label: "Delivered", value: delivered },
                    { label: "Pending", value: pending },
                    { label: "Cancelled", value: cancelled },

                  ]}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <DonutChart
                  title="Dispatch Progress"
                  data={[
                    { label: "Ready to Ship", value: readytoship },
                    { label: "Shipped", value: shipped },
                    { label: "Delivered", value: delivered },
                  ]}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Revenue Summary */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { label: "Total Revenue", value: `₹${(revenue?.totalRevenue || 0).toFixed(2)}` },
              { label: "Prepaid", value: `₹${(revenue?.prepaid || 0).toFixed(2)}` },
              { label: "To Pay", value: `₹${(revenue?.toPay || 0).toFixed(2)}` },
              { label: "COD", value: `₹${(revenue?.cod || 0).toFixed(2)}` },
            ]
              .map((mode, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #f5faff, #e6f0ff)",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={500} gutterBottom>
                      {mode.label}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      {mode.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Tables and Overviews */}
      <Box mt={5}>
        <ShipmentOverview />
      </Box>
      <Box mt={4}>
        <ShipmentOverviewTable />
      </Box>
      <Box mt={4}>
        <DashboardOverview />
      </Box>
    </Box>
  );
};

export default DashboardSummary;










// import React from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Switch,
//   Divider,
//   Stack
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import {
//   North,
//   South,
//   East,
//   West,
//   FlightTakeoff,
// } from '@mui/icons-material';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchOrderCount } from "../../redux/orderRelated/orderHandel";
// import { fetchOrderRevenue } from "../../redux/orderRelated/orderHandel"

// // Chart styles
// const chartColors = ['#5D9CEC', '#D3D3D3', '#A9A9A9'];

// const ChartWrapper = styled(Box)`
//   position: relative;
//   width: 140px;
//   height: 140px;
//   border-radius: 50%;
//   background: ${({ data }) => {
//     const total = data.reduce((a, b) => a + b.value, 0);
//     let angle = 0;
//     return `conic-gradient(${data
//       .map((d, i) => {
//         const start = angle;
//         const deg = (d.value / total) * 360;
//         angle += deg;
//         return `${chartColors[i]} ${start}deg ${start + deg}deg`;
//       })
//       .join(', ')})`;
//   }};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const InnerCircle = styled(Box)`
//   width: 80px;
//   height: 80px;
//   background: #fff;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   font-size: 14px;
//   text-align: center;
// `;

// const LabelDot = styled.span`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   display: inline-block;
//   background-color: ${(props) => props.color};
// `;

// // const StatCard = styled(Card)`
// //   min-width: 100px;
// //   text-align: center;
// //   box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
// // `;

// // const ModeBox = styled(Box)`
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 10px;
// //   text-align: center;
// //   box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
// //   width: 100%;
// // `;

// // Donut Chart
// const DonutChart = ({ data, title }) => {
//   const total = data.reduce((a, b) => a + b.value, 0);

//   return (
//     <Box display="flex" alignItems="center" gap={2}>
//       <ChartWrapper data={data}>
//         <InnerCircle>
//           {total}
//           <br />
//           {title}
//         </InnerCircle>
//       </ChartWrapper>
//       <Box>
//         {data.map((item, i) => (
//           <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
//             <LabelDot color={chartColors[i]} />
//             <Typography variant="body2" color="textSecondary">
//               {item.label}: {item.value}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// // Latest Orders
// const orders = [
//   { id: '221222', consignee: 'MR. Harshil Patel\nAhmedabad, Gujarat', date: '21 Feb, 2025', status: 'Manifested' },
//   { id: '221221', consignee: 'MR. Suman Patel\nSurat, Gujarat', date: '16 Feb, 2025', status: 'Delivered' },
//   { id: '221220', consignee: 'MR. Aman Patel\nRajkot, Gujarat', date: '11 Feb, 2025', status: 'Delivered' },
//   { id: '221219', consignee: 'MR. Raj Patel\nKatch, Gujarat', date: '08 Feb, 2025', status: 'Delivered' },
// ];

// // Shipment Overview Section
// const ShipmentOverview = () => {
//   return (
//     <Box mt={4}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               p: 2,
//               height: "100%",
//               bgcolor: "#fdfdfd",
//             }}
//           >
//             <Grid container spacing={1}>
//               <Grid item xs={4}>
//                 <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
//                   Order Performance
//                 </Typography>
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
//                   Order Revenue
//                 </Typography>
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
//                   Weight
//                 </Typography>
//               </Grid>

//               <Divider sx={{ width: "100%", my: 1 }} />

//               {[
//                 ["Manifested", "7", "This Week", "$ 7.4k", "This Week", "247.23 Kg"],
//                 ["In-Transit", "10", "This Month", "$ 26.14k", "This Month", "523.35 Kg"],
//                 ["Pending", "1", "Last 3 Month", "$ 172k", "Last 3 Month", "3.2 Ton"],
//                 ["OFD", "1", "Last 6 Month", "$ 272k", "Last 6 Month", "3.6 Ton"],
//                 ["Delivered", "730", "", "", "", ""],
//                 ["RTO", "200", "", "", "", ""],
//               ].map(([label, value, time1, val1, time2, val2], idx) => (
//                 <React.Fragment key={idx}>
//                   <Grid item xs={4}>
//                     <Box p={0.5}>
//                       <Typography fontWeight={600} fontSize="0.95rem">{label}</Typography>
//                       <Typography variant="caption" color="text.secondary">{value}</Typography>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={4}>
//                     {time1 && (
//                       <Box p={0.5}>
//                         <Typography variant="caption" color="text.secondary">
//                           {time1}
//                         </Typography>
//                         <Typography fontWeight={500} color="success.main" fontSize="0.9rem">
//                           {val1}
//                         </Typography>
//                       </Box>
//                     )}
//                   </Grid>
//                   <Grid item xs={4}>
//                     {time2 && (
//                       <Box p={0.5}>
//                         <Typography variant="caption" color="text.secondary">
//                           {time2}
//                         </Typography>
//                         <Typography fontWeight={500} color="success.main" fontSize="0.9rem">
//                           {val2}
//                         </Typography>
//                       </Box>
//                     )}
//                   </Grid>
//                 </React.Fragment>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>


//         <Grid item xs={12} md={6}>
//           <Paper variant="outlined" sx={{ p: 3, height: "100%", bgcolor: "#fcfcfc", borderRadius: 3 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//               <Typography variant="subtitle1" fontWeight={700}>
//                 Total Shipment Weight – Feb
//               </Typography>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Typography variant="caption">Report</Typography>
//                 <Switch size="small" />
//               </Box>
//             </Box>

//             <Grid container spacing={2} px={1}>
//               {[
//                 { dir: "North", weight: "0 kg", icon: <North fontSize="small" /> },
//                 { dir: "West", weight: "135 kg", icon: <West fontSize="small" /> },
//                 { dir: "South", weight: "15 kg", icon: <South fontSize="small" /> },
//                 { dir: "East", weight: "45 kg", icon: <East fontSize="small" /> },
//                 { dir: "Flight", weight: "45 kg", icon: <FlightTakeoff fontSize="small" /> },
//               ].map((item, idx) => (
//                 <Grid
//                   item
//                   xs={idx === 4 ? 12 : 6}
//                   key={idx}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     p={1.5}
//                     sx={{
//                       border: "1px solid #e0e0e0",
//                       borderRadius: 2,
//                       backgroundColor: "#f5faff",
//                       width: "100%",
//                       height: "95px",
//                       maxWidth: 200,
//                       mx: "auto",
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                         transform: "translateY(-2px)",
//                       },
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       display="flex"
//                       alignItems="center"
//                       gap={1}
//                       mb={0.5}
//                       color="text.secondary"
//                     >
//                       {item.icon}
//                       {item.dir}
//                     </Typography>
//                     <Typography variant="body1" fontWeight={700} color="primary.main">
//                       {item.weight}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// };



// const shipmentData = [
//   { courier: 'DELHIVERY B2B', manifested: 3, inTransit: 2, pending: 0, ofd: 0, delivered: 13, rto: 0, lost: 0, total: 18 },
//   { courier: 'DELHIVERY B2B', manifested: 0, inTransit: 6, pending: 1, ofd: 4, delivered: 322, rto: 1, lost: 0, total: 334 },
//   { courier: 'AMAZONE', manifested: 1, inTransit: 1, pending: 0, ofd: 0, delivered: 16, rto: 0, lost: 0, total: 19 },
//   { courier: 'DTDC', manifested: 2, inTransit: 0, pending: 0, ofd: 0, delivered: 55, rto: 286, lost: 0, total: 343 },
//   { courier: 'Ecom Express', manifested: 3, inTransit: 1, pending: 0, ofd: 0, delivered: 286, rto: 55, lost: 0, total: 345 },
//   { courier: 'eKart', manifested: 0, inTransit: 2, pending: 0, ofd: 0, delivered: 16, rto: 23, lost: 0, total: 43 },
//   { courier: 'Shree Maruti', manifested: 1, inTransit: 3, pending: 0, ofd: 0, delivered: 13, rto: 0, lost: 0, total: 18 },
//   { courier: 'BLUE DART', manifested: 0, inTransit: 1, pending: 0, ofd: 0, delivered: 23, rto: 1, lost: 0, total: 25 },
// ];

// // Table component
// const ShipmentOverviewTable = () => {
//   return (
//     <Box mt={4}>
//       <Paper
//         variant="outlined"
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           boxShadow: 2,
//           borderColor: '#e0e0e0',
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 700,
//             mb: 0.5,
//             color: '#333',
//           }}
//         >
//           Shipment Overview By Courier
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mb: 2 }}
//         >
//           This is the total weight of shipment in Feb month.
//         </Typography>
//         <TableContainer>
//           <Table size="small" sx={{ minWidth: 800 }}>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   backgroundColor: '#f5f7fa',
//                   '& th': {
//                     fontWeight: 600,
//                     fontSize: '0.875rem',
//                     color: '#1976d2', // Blue color for header text

//                     borderBottom: '1px solid #e0e0e0',
//                   },
//                 }}
//               >
//                 <TableCell>Courier Name</TableCell>
//                 <TableCell align="center">Manifested</TableCell>
//                 <TableCell align="center">In-Transit</TableCell>
//                 <TableCell align="center">Pending</TableCell>
//                 <TableCell align="center">OFD</TableCell>
//                 <TableCell align="center">Delivered</TableCell>
//                 <TableCell align="center">RTO</TableCell>
//                 <TableCell align="center">Lost</TableCell>
//                 <TableCell align="center">Total Shipment</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {shipmentData.map((row, idx) => (
//                 <TableRow
//                   key={idx}
//                   sx={{
//                     backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9',
//                     '& td': {
//                       fontSize: '0.85rem',
//                       color: '#444',
//                       borderBottom: '1px solid #eee',
//                     },
//                   }}
//                 >
//                   <TableCell>{row.courier}</TableCell>
//                   <TableCell align="center">{row.manifested}</TableCell>
//                   <TableCell align="center">{row.inTransit}</TableCell>
//                   <TableCell align="center">{row.pending}</TableCell>
//                   <TableCell align="center">{row.ofd}</TableCell>
//                   <TableCell align="center">{row.delivered}</TableCell>
//                   <TableCell align="center">{row.rto}</TableCell>
//                   <TableCell align="center">{row.lost}</TableCell>
//                   <TableCell align="center">{row.total}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };

// const barData = [
//   { name: "Oct-25", B2B: 5, B2C: 0 },
//   { name: "Nov-25", B2B: 10, B2C: 100 },
//   { name: "Dec-25", B2B: 15, B2C: 300 },
//   { name: "Jan-25", B2B: 15, B2C: 430 },
//   { name: "Jan-25", B2B: 20, B2C: 120 },
// ];

// const pieData = [
//   { name: "Delivered", value: 738 },
//   { name: "RTO", value: 221 },
//   { name: "In Transit", value: 13 },
//   { name: "Manifested", value: 7 },
//   { name: "Pending", value: 1 },
//   { name: "OFD", value: 1 },
//   { name: "Non Picked", value: 0 },
// ];

// const COLORS = [
//   "#619ED8",
//   "#F26938",
//   "#FEBE5E",
//   "#619ED8",
//   "#619ED8",
//   "#619ED8",
//   "#619ED8",
// ];

// const shippingData = [
//   { courier: "DELHIVERY B2B", weight: "164 Kg" },
//   { courier: "DELHIVERY B2C", weight: "200.3 Kg" },
//   { courier: "Ecom Express", weight: "11.5 Kg" },
//   { courier: "eKart", weight: "12.5 Kg" },
// ];

// const DashboardOverview = () => {
//   return (
//     <Box p={4} sx={{ backgroundColor: "#f9f9f9" }}>
//       <Grid container spacing={3}>
//         {/* Performance Report */}
//         <Grid item xs={12} md={4}>
//           <Card className="shadow-md rounded-xl">
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 700, color: "#4A90E2" }}
//                 gutterBottom
//               >
//                 Performance Report
//               </Typography>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 The total shipments during a user's active period on our
//                 website.
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={barData}>
//                   <XAxis dataKey="name" stroke="#8884d8" fontSize={12} />
//                   <YAxis stroke="#8884d8" fontSize={12} />
//                   <Tooltip />
//                   <Bar
//                     dataKey="B2B"
//                     fill="#2F3A4C"
//                     barSize={8}
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="B2C"
//                     fill="#619ED8"
//                     barSize={8}
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//               <Stack direction="row" spacing={2} mt={2}>
//                 <Box display="flex" alignItems="center">
//                   <Box width={16} height={4} bgcolor="#2F3A4C" mr={1} />
//                   <Typography variant="caption">B2B Shipment</Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center">
//                   <Box width={16} height={4} bgcolor="#619ED8" mr={1} />
//                   <Typography variant="caption">B2C Shipment</Typography>
//                 </Box>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Order Status Report */}
//         <Grid item xs={12} md={4}>
//           <Card className="shadow-md rounded-xl">
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 700, color: "#4A90E2" }}
//                 gutterBottom
//               >
//                 Order Status Report
//               </Typography>
//               <Box sx={{ width: "100%", height: 260, position: "relative" }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={85}
//                       label
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend
//                       layout="vertical"
//                       verticalAlign="middle"
//                       align="right"
//                       iconType="circle"
//                       iconSize={10}
//                       wrapperStyle={{ fontSize: 10 }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Load Against Shipping Partners */}
//         <Grid item xs={12} md={4}>
//           <Card className="shadow-md rounded-xl">
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 700, color: "#4A90E2" }}
//                 gutterBottom
//               >
//                 Load Against Shipping Partners
//               </Typography>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 This is the total weight of shipments in Feb Month.
//               </Typography>
//               <Stack spacing={2} mt={2}>
//                 {shippingData.map((item, idx) => (
//                   <Box
//                     key={idx}
//                     sx={{
//                       backgroundColor: "#F5FAFF",
//                       p: 1.5,
//                       px: 2,
//                       borderRadius: 2,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontFamily: "cursive",
//                       fontWeight: 500,
//                       fontSize: "0.95rem",
//                       color: "#497CBB",
//                     }}
//                   >
//                     <span>{item.courier}</span>
//                     <span>{item.weight}</span>
//                   </Box>
//                 ))}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



// const DashboardSummary = () => {
//   const dispatch = useDispatch();
//   const { orderCount, revenueSummary } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchOrderCount());
//     dispatch(fetchOrderRevenue());
//   }, [dispatch]);


//   const {
//     total = 0,
//     pending = 0,
//     readytoship = 0,
//     shipped = 0,
//     delivered = 0,
//     cancelled = 0,
//   } = orderCount || {};

//   return (
//     <Box p={3} sx={{ background: "#f4f6f9", minHeight: "100vh" }}>
//       <Grid container spacing={4} alignItems="flex-start">
//         {/* Stat Cards */}
//         <Grid item xs={12} md={6}>
//           <Grid container spacing={3}>
//             {[
//               { label: "Total Orders", value: total },
//               { label: "Ready to Ship", value: readytoship },
//               { label: "Pending Shipment", value: pending },
//               { label: "Shipped", value: shipped },
//               { label: "Delivered", value: delivered },
//               { label: "Cancelled", value: cancelled },
//             ].map((stat, idx) => (
//               <Grid item xs={12} sm={6} key={idx}>
//                 <Box
//                   sx={{
//                     background: "#fff",
//                     borderRadius: 3,
//                     p: 3,
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                     textAlign: "center",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
//                     },
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
//                     {stat.label}
//                   </Typography>
//                   <Typography variant="h5" color="primary" fontWeight={600}>
//                     {stat.value}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         {/* Donut Charts */}
//         <Grid item xs={12} md={6}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   p: 3,
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   backgroundColor: "#ffffff",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//                     transform: "translateY(-6px)",
//                   },
//                 }}
//               >
//                 <DonutChart
//                   title="Shipment Status"
//                   data={[
//                     { label: "Delivered", value: delivered },
//                     { label: "Pending", value: pending },
//                     { label: "Cancelled", value: cancelled },
//                     { label: "Shipped", value: shipped },
//                   ]}
//                 />
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   p: 3,
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   backgroundColor: "#ffffff",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//                     transform: "translateY(-6px)",
//                   },
//                 }}
//               >
//                 <DonutChart
//                   title="Dispatch Progress"
//                   data={[
//                     { label: "Ready to Ship", value: readytoship },
//                     { label: "Shipped", value: shipped },
//                     { label: "Delivered", value: delivered },
//                   ]}
//                 />
//               </Box>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Revenue Summary */}
//         <Grid item xs={12}>
//           <Grid container spacing={3}>
//             {[
//               { label: "Total Revenue", value: `₹${revenueSummary?.totalRevenue || 0}` },
//               { label: "Prepaid", value: `₹${revenueSummary?.totalPrepaid || 0}` },
//               { label: "To Pay", value: `₹${revenueSummary?.totalToPay || 0}` },
//               { label: "COD", value: `₹${revenueSummary?.totalCOD || 0}` },
//             ].map((mode, idx) => (
//                 <Grid item xs={12} sm={6} md={3} key={idx}>
//                   <Box
//                     sx={{
//                       background: "linear-gradient(135deg, #f5faff, #e6f0ff)",
//                       borderRadius: 3,
//                       p: 4,
//                       textAlign: "center",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                       "&:hover": {
//                         transform: "translateY(-6px)",
//                         boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
//                       },
//                     }}
//                   >
//                     <Typography variant="subtitle2" color="text.secondary" fontWeight={500} gutterBottom>
//                       {mode.label}
//                     </Typography>
//                     <Typography variant="h6" color="primary" fontWeight={700}>
//                       {mode.value}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               ))}
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Tables and Overviews */}
//       <Box mt={5}>
//         <ShipmentOverview />
//       </Box>
//       <Box mt={4}>
//         <ShipmentOverviewTable />
//       </Box>
//       <Box mt={4}>
//         <DashboardOverview />
//       </Box>
//     </Box>
//   );
// };

// export default DashboardSummary;













