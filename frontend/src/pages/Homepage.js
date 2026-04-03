import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import mylogisticimage from "../assets/mylogisticimage.png";

const Homepage = () => {
    return (
        <Background>
            <StyledContainer maxWidth="lg">
                <ContentCard>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left - Image */}
                        <Grid item xs={12} md={6}>
                            <ResponsiveImage
                                src={mylogisticimage}
                                alt="MyLogistix Logo"
                            />
                        </Grid>

                        {/* Right - Text & Buttons */}
                        <Grid item xs={12} md={6}>
                            <StyledBox>
                                <StyledTitle>
                                    Welcome to<br />MyLogistix Admin
                                </StyledTitle>
                                <StyledText>
                                    Effortlessly manage courier partners, customers, shipping plans,
                                    payments, and real-time tracking — all from one intuitive dashboard.
                                    Empower your business with smart automation and complete visibility.
                                </StyledText>

                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <StyledLink to="/Adminlogin">
                                        <Button
                                            sx={{
                                                backgroundColor: '#42A5F5',
                                                color: 'white',
                                                padding: '10px 25px',
                                                fontWeight: 600,
                                                borderRadius: '8px',
                                                width: '100%',
                                                maxWidth: '250px',
                                                '&:hover': { backgroundColor: '#1E88E5' },
                                            }}
                                            fullWidth
                                        >
                                            Login
                                        </Button>
                                    </StyledLink>
                                </Box>
                            </StyledBox>
                        </Grid>
                    </Grid>
                </ContentCard>
            </StyledContainer>
        </Background>
    );
};

export default Homepage;

// ---------------- Styled Components ----------------

const Background = styled.div`
    background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const StyledContainer = styled(Container)`
    padding: 20px;
    height: 100%;
`;

const ContentCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

    height: 500px;
    max-height: 500px;
    overflow-y: auto;

    @media (max-width: 768px) {
        height: auto;
        max-height: 90vh;
    }
        @media (max-width: 898px) {
        height: auto;
        max-height: 90vh;
    }
`;

const ResponsiveImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    margin-top:50px;

    @media (max-width: 768px) {
        max-height: 200px;
    }

    @media (max-width: 375px) {
        max-height: 150px;
    }
`;

const StyledBox = styled(Box)`
    text-align: center;
    margin-top:50px;

    @media (max-width: 400px) {
        margin-top:-40px;
    }
`;

const StyledTitle = styled.h1`
    font-size: 2.8rem;
    color: #1565C0;
    font-weight: bold;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 375px) {
        font-size: 1.6rem;
        margin-bottom: 15px;
    }
`;

const StyledText = styled.p`
    color: #333;
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.6;
     text-align: justify;
    

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 375px) {
        font-size: 0.9rem;
        margin-bottom: 15px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
    display: flex;
    justify-content: center;
`;
