import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const zoneData = [
    {
        title: '5 Matrix',
        zones: [
            { zone: 'North', cities: 'Delhi, Haryana, Rajasthan, Uttar Pradesh, Uttarakhand, Kansas, Punjab, Chandigarh, Himachal Pradesh, Jammu and Kashmir' },
            { zone: 'West', cities: 'Gujarat, Maharashtra, Goa, Madhya Pradesh, Silvassa, Chhattisgarh, Dadra and Nagar Haveli and Daman, Daman and Diu' },
            { zone: 'South', cities: 'Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Pondicherry' },
            { zone: 'East', cities: 'West Bengal, Odisha, Bihar, Jharkhand, Andaman and Nicobar Islands' },
            { zone: 'North East', cities: 'Assam, Meghalaya, Tripura, Arunachal Pradesh, Mizoram, Manipur, Nagaland, Sikkim' }
        ]
    },
    {
        title: '11 Matrix',
        zones: [
            { zone: 'N1', cities: 'Delhi, Uttar Pradesh, Haryana, Rajasthan' },
            { zone: 'N2', cities: 'Chandigarh, Punjab, Uttarakhand, Ladakh' },
            { zone: 'N3', cities: 'Himachal Pradesh, Jammu & Kashmir' },
            { zone: 'C1', cities: 'Madhya Pradesh' },
            { zone: 'W1', cities: 'Gujarat, Daman & Diu and Dadra & Nagar Haveli' },
            { zone: 'W2', cities: 'Maharashtra, Goa' },

            { zone: 'S1', cities: 'Andhra Pradesh, Telangana, Karnataka, Tamilnadu & Puducherry' },
            { zone: 'S2', cities: 'Kerala' },
            { zone: 'E1', cities: 'West Bengal, Odisha, Bihar, Jharkhand, Chhattisgarh' },
            { zone: 'NE1', cities: 'Guwahati' },
            { zone: 'NE2', cities: 'Assam, Meghalaya, Tripura, Arunachal Pradesh, Mizoram, Manipur, Nagaland and Sikkim' }
        ]
    },
    {
        title: '16 Matrix',
        zones: [
            { zone: 'N1', cities: 'New Delhi, Faridabad, Gurgaon, Ghaziabad, Noida, Sahibabad, Chandigarh, Jaipur' },
            { zone: 'N2', cities: 'Dehradun, Ludhiana' },
            { zone: 'N3', cities: 'Haryana, Punjab, Rajasthan, Uttar Pradesh' },
            { zone: 'N4', cities: 'Himachal Pradesh, Jammu & Kashmir, Uttarakhand' },
            { zone: 'C1', cities: 'Bhopal, Indore, Raipur' },
            { zone: 'C2', cities: 'Chattisgarh, Madhya Pradesh' },
            { zone: 'W1', cities: 'Mumbai, Pune, Thane, Ahmedabad, Surat' },
            { zone: 'W2', cities: 'Maharashtra, Gujarat, Goa' },
            { zone: 'S1', cities: 'Bengaluru, Hyderabad, Chennai' },
            { zone: 'S2', cities: 'Andhra Pradesh, Karnataka, Telangana' },
            { zone: 'S3', cities: 'Tamil Nadu, Pondicherry' },
            { zone: 'S4', cities: 'Kerala' },
            { zone: 'E1', cities: 'Kolkata, Patna, Ranchi, Bhubaneswar, Siliguri' },
            { zone: 'E2', cities: 'Bihar, Odisha, Jharkhand, West Bengal' },
            { zone: 'NE1', cities: 'Guwahati' },
            { zone: 'NE2', cities: 'Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura' }
        ]

    },
    {
        title: '24 Matrix',
        zones: [
            { zone: 'N1', cities: 'Ambala' },
            { zone: 'N2', cities: 'Delhi, Noida, Gurgaon, Faridabad, Ghaziabad' },
            { zone: 'N3', cities: 'Jaipur' },
            { zone: 'N4', cities: 'Lucknow' },
            { zone: 'N5', cities: 'Punjab, Chandigarh, Himachal Pradesh, J&K' },
            { zone: 'N7', cities: 'Rajasthan' },
            { zone: 'N8', cities: 'Uttar Pradesh East' },

            { zone: 'W1', cities: 'Indore, Ahmedabad' },
            { zone: 'W2', cities: 'Mumbai, Pune, Nagpur' },
            { zone: 'W3', cities: 'Gujarat, Madhya Pradesh, Daman & Diu, Dadra & Nagar Haveli' },
            { zone: 'W4', cities: 'Maharashtra, Goa, Chhattisgarh' },

            { zone: 'S1', cities: 'Hyderabad' },
            { zone: 'S2', cities: 'Bangalore, Chennai' },
            { zone: 'S3', cities: 'Coimbatore' },
            { zone: 'S4', cities: 'Andhra Pradesh, Telangana' },
            { zone: 'S5', cities: 'Karnataka, Tamil Nadu, Pondicherry' },
            { zone: 'S6', cities: 'Kerala' },

            { zone: 'E1', cities: 'Jamshedpur, Kolkata' },
            { zone: 'E2', cities: 'Guwahati, Siliguri' },
            { zone: 'E3', cities: 'West Bengal, Odisha, Bihar, Jharkhand' },
            { zone: 'E4', cities: 'Assam, Meghalaya, Tripura, Arunachal Pradesh, Mizoram, Manipur, Nagaland, Sikkim' }
        ]

    },
    {
        title: 'Gati Zone',
        zones: [
            { zone: 'N1', cities: 'Delhi, Ghaziabad, Noida, Faridabad, Gurgaon' },
            { zone: 'N2', cities: 'Himachal Pradesh, Punjab, Uttar Pradesh, Haryana, Chandigarh, Ladakh, Uttarakhand, Rajasthan' },

            { zone: 'W1', cities: 'Daman and Diu, Mumbai, Dadra and Nagar Haveli, Gujarat' },
            { zone: 'W2', cities: 'Chhattisgarh, Madhya Pradesh, Rest of Maharashtra, Goa' },

            { zone: 'S1', cities: 'Karnataka, Chennai, Pondicherry, Telangana, Andhra Pradesh' },
            { zone: 'S2', cities: 'Kerala, Tamil Nadu, Lakshadweep' },

            { zone: 'E', cities: 'Sikkim, Jharkhand, West Bengal, Odisha, Bihar' },

            { zone: 'NE1', cities: 'Guwahati' },
            { zone: 'NE2', cities: 'Assam, Nagaland, Mizoram, Manipur, Meghalaya, Arunachal Pradesh, Tripura' },

            { zone: 'SXR', cities: 'Jammu and Kashmir, Srinagar' },
            { zone: 'IXZ', cities: 'Port Blair' }
        ]
    },
    {
        title: 'Ekart B2B Matrix',
        zones: [
            {
                zone: 'North',
                cities: 'Delhi, Haryana, Rajasthan, Uttar Pradesh, Uttarakhand, Punjab, Himachal Pradesh'
            },
            {
                zone: 'West',
                cities: 'Gujarat, Maharashtra, Goa, Madhya Pradesh, Chhattisgarh, Dadra and Nagar Haveli and Daman, Daman and Diu'
            },
            {
                zone: 'South',
                cities: 'Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Pondicherry'
            },
            {
                zone: 'East',
                cities: 'West Bengal, Odisha, Bihar, Jharkhand, Assam'
            },
            {
                zone: 'North East',
                cities: 'Meghalaya, Tripura, Arunachal Pradesh, Mizoram, Manipur, Nagaland, Sikkim'
            }
        ]
    },
    {
        title: 'Vxpress Zone',
        zones: [
            { zone: 'N1', cities: 'Delhi, Faridabad, Ghaziabad, Gurgaon, Noida, Jaipur' },
            { zone: 'N2', cities: 'Haryana, Punjab, Rajasthan, Uttar Pradesh, Uttarakhand, Chandigarh, Himachal Pradesh' },
            { zone: 'N3', cities: 'Jammu' },

            { zone: 'G1', cities: 'Ahmedabad, Baroda, Vapi, Surat, Daman, Dadra & Nagar Haveli' },
            { zone: 'G2', cities: 'Rest of Gujarat, Diu' },
            { zone: 'G3', cities: 'Goa' },

            { zone: 'M1', cities: 'Mumbai, Pune, Bhiwandi, Palghar, Navi Mumbai' },
            { zone: 'M2', cities: 'Rest of Maharashtra' },

            { zone: 'C1', cities: 'Bhopal, Indore, Raipur, Nagpur' },
            { zone: 'C2', cities: 'Rest of Chhattisgarh, Rest of Madhya Pradesh, Vidarbha' },

            { zone: 'S1', cities: 'Bangalore, Hyderabad, Secunderabad' },
            { zone: 'S2', cities: 'Chennai, Pondicherry, Tamil Nadu, Andhra Pradesh, Rest of Telangana, Rest of Karnataka' },
            { zone: 'S3', cities: 'Kerala' },

            { zone: 'E1', cities: 'Kolkata, Howrah, Bhubaneshwar, Cuttack, Patna, Ranchi' },
            { zone: 'E2', cities: 'Rest of Bihar, Rest of Jharkhand, Rest of Odisha, Rest of West Bengal' },

            { zone: 'NE1', cities: 'Siliguri, Guwahati' },
            { zone: 'NE2', cities: 'Rest of Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura' },
            { zone: 'NE3', cities: 'Srinagar' }
        ]

    },
    {
        title: 'DP World Matrix',
        zones: [
            { zone: 'N1', cities: 'Delhi, NCR, Haryana, Uttar Pradesh West' },
            { zone: 'N2', cities: 'Ambala, Chandigarh, Himachal Pradesh, Punjab, and Uttarakhand' },
            { zone: 'N3', cities: 'JAIPUR / Rajasthan' },
            { zone: 'N4', cities: 'Lucknow and Uttar Pradesh East' },
            { zone: 'N5', cities: 'Jammu & Kashmir Special zone' },

            { zone: 'E1', cities: 'Bihar' },
            { zone: 'E2', cities: 'Kolkata, Kolkata Suburbs, Jharkhand' },
            { zone: 'E3', cities: 'Odisha' },
            { zone: 'E4', cities: 'Rest of West Bengal (Malda and North Bengal)' },

            { zone: 'C1', cities: 'Madhya Pradesh, Chhattisgarh' },

            { zone: 'W1', cities: 'Dadra & Nagar Haveli, Daman & Diu and Gujarat' },
            { zone: 'W2', cities: 'Mumbai, Mumbai Suburbs and Nashik' },
            { zone: 'W3', cities: 'Vidarbha' },
            { zone: 'W4', cities: 'Pune, ROM and Goa' },

            { zone: 'S1', cities: 'HYDERABAD, Andhra Pradesh (excluding Sricity) & Telangana' },
            { zone: 'S2', cities: 'BANGALORE, Karnataka, Hosur' },
            { zone: 'S3', cities: 'Andaman and Nicobar, Podicherry, Chennai, Chennai Suburbs, Sricity' },
            { zone: 'S4', cities: 'Rest of Tamil Nadu' },
            { zone: 'S4', cities: 'Kerla' },

            { zone: 'NE1', cities: 'Guwahati' },
            { zone: 'NE2', cities: 'Sikkim' },
            { zone: 'NE3', cities: 'Assam, Meghalaya, Mizoram, Nagaland, Manipur, Tripura, Arunachal Pradesh' },
        ]
    },
    {
        title: 'Rivigo Matrix',
        zones: [
            { zone: 'N1', cities: 'Delhi, Haryana, Uttar Pradesh, Rajasthan' },
            { zone: 'N2', cities: 'Chandigarh, Punjab, Uttarakhand, Himachal Pradesh' },
            { zone: 'N3', cities: 'Jammu and Kashmir, Ladakh' },

            { zone: 'C1', cities: 'Madhya Pradesh' },

            { zone: 'W1', cities: 'Maharashtra' },
            { zone: 'W2', cities: 'Gujarat, Dadra and Nagar Haveli and Daman and Diu' },
            { zone: 'W3', cities: 'Goa' },

            { zone: 'S1', cities: 'Andhra Pradesh, Telangana, Karnataka, Tamil Nadu & Puducherry' },
            { zone: 'S2', cities: 'Kerala, Lakshadweep' },

            { zone: 'E1', cities: 'Chhattisgarh, Bihar, Odisha, West Bengal, Jharkhand, Andaman and Nicobar Islands' },

            { zone: 'NE1', cities: 'Guwahati' },
            { zone: 'NE2', cities: 'Assam, Meghalaya, Sikkim, Mizoram, Nagaland, Manipur, Tripura, Arunachal Pradesh' }
        ]

    },
    {
        title: 'Movin Matrix',
        zones: [
            { zone: 'N1', cities: 'Delhi NCR' },
            { zone: 'N2', cities: 'Chandigarh, Haryana, Himachal Pradesh, Punjab, Rajasthan, Uttarakhand, Uttar Pradesh' },
            { zone: 'N3', cities: 'Jammu & Kashmir, Ladakh' },

            { zone: 'C1', cities: 'Bhopal' },
            { zone: 'C2', cities: 'Chhattisgarh, Nagpur, Madhya Pradesh' },

            { zone: 'W1', cities: 'Mumbai' },
            { zone: 'W2', cities: 'Dadra & Nagar Haveli, Daman & Diu, Goa, Gujarat, Maharashtra (excluding Nagpur)' },

            { zone: 'S1', cities: 'Bangalore, Chennai, Hyderabad' },
            { zone: 'S2', cities: 'Andhra Pradesh, Karnataka, Puducherry, Tamil Nadu, Telangana' },
            { zone: 'S3', cities: 'Kerala' },

            { zone: 'E1', cities: 'Kolkata' },
            { zone: 'E1', cities: 'Bihar, Jharkhand, Odisha, West Bengal' },

            { zone: 'NE1', cities: 'Bagdogra, Guwahati' },
            { zone: 'NE2', cities: 'Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura' }
        ]

    },
];

const ZoneMatrix = () => {
    return (
        <Box sx={{ padding: 4, backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: '700',
                    marginBottom: 3,
                    textAlign: 'center',
                    color: '#4A90E2', // primary blue
                    fontSize: '2rem',
                    letterSpacing: '-0.5px',
                }}
            >
                Zone Lists
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    padding: 2,
                    maxWidth: 1300,
                    margin: 'auto',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                }}
            >
                {zoneData.map((matrix, idx) => (
                    <Accordion
                        key={idx}
                        sx={{
                            border: '1px solid #e5e7eb',
                            borderRadius: 1.5,
                            marginBottom: 2,
                            backgroundColor: '#fff',
                            boxShadow: 'none',
                            '&:before': { display: 'none' },
                            '&.Mui-expanded': {
                                margin: 'auto',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#4A90E2' }} />}
                            sx={{
                                backgroundColor: '#fcfdff',
                                padding: '18px 24px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: '1.15rem',
                                color: '#34495e',
                                borderBottom: '1px solid #e0e0e0',
                                transition: 'background 0.2s ease',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9',
                                },
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>{matrix.title}</Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ backgroundColor: '#f7f9fc', padding: '24px 28px' }}>
                            {matrix.zones ? (
                                <TableContainer>
                                    <Table
                                        size="small"
                                        sx={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontFamily: "Arial, sans-serif",
                                            fontSize: 14,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <TableHead
                                            sx={{
                                                backgroundColor: '#f7f9fc',
                                            }}
                                        >
                                            <TableRow>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        border: '1px solid #ddd',
                                                        textAlign: 'center',
                                                        color: '#2c3e50',
                                                        padding: '12px',
                                                    }}
                                                >
                                                    Zone
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        border: '1px solid #ddd',
                                                        textAlign: 'center',
                                                        color: '#2c3e50',
                                                        padding: '12px',
                                                    }}
                                                >
                                                    Cities
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {matrix.zones.map((item, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        transition: 'background-color 0.2s',
                                                        '&:hover': {
                                                            backgroundColor: '#f1f1f1',
                                                        },
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: 500,
                                                            border: '1px solid #ddd',
                                                            textAlign: 'center',
                                                            color: '#34495e',
                                                            padding: '10px',
                                                        }}
                                                    >
                                                        {item.zone}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            border: '1px solid #ddd',
                                                            backgroundColor: '#fdfdfd',
                                                            textAlign: 'center',
                                                            color: '#374151',
                                                            padding: '10px',
                                                        }}
                                                    >
                                                        {item.cities}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    No zone data available.
                                </Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </Box>
    );
};

export default ZoneMatrix;
