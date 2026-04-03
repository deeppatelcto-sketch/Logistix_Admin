import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled components with your color theme
const Container = styled(Box)({
  backgroundColor: '#f9fbfd',
  minHeight: '100vh',
  padding: '40px'
});

const Title = styled(Typography)({
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#4A90E2',
  marginBottom: '32px',
  fontSize: '24px'
});

const SectionTitle = styled(Typography)({
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '16px',
  color: '#374151',
  marginBottom: '8px'
});

const VideoCard = styled(Paper)({
  overflow: 'hidden',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  border: '1px solid #e0e7ff',
  backgroundColor: '#fff'
});

const videoData = [
  {
    title: 'KYC Verification',
    url: 'https://www.youtube.com/embed/ZtFjLJ6Iei8?autoplay=1&mute=1'
  },
  {
    title: 'Order Creation',
    url: 'https://www.youtube.com/embed/gMZ1-bxHdfY?autoplay=1&mute=1'
  },
  {
    title: 'Generate Shipping Labels',
    url: 'https://www.youtube.com/embed/RtHzcb6yysE?autoplay=1&mute=1'
  },
  {
    title: 'Ready To Ship',
    url: 'https://www.youtube.com/embed/5c2Z8KPQpAg?autoplay=1&mute=1'
  },
  {
    title: 'Weight Discrepancy',
    url: 'https://www.youtube.com/embed/ikHkXHe9uIM?autoplay=1&mute=1'
  },
  {
    title: 'Early COD',
    url: 'https://www.youtube.com/embed/Iq3YFdiu0A4?autoplay=1&mute=1'
  },
  {
    title: 'Non-Delivery Report (NDR)',
    url: 'https://www.youtube.com/embed/xpUkNDoGHHM?autoplay=1&mute=1'
  },
  {
    title: 'Delivery Appointment',
    url: 'https://www.youtube.com/embed/oqnLEwqgokI?autoplay=1&mute=1'
  }
];

const TrainingVideos = () => {
  return (
    <Container>
      <Title>Training Videos</Title>
      <Grid container spacing={4}>
        {videoData.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SectionTitle>{video.title}</SectionTitle>
            <VideoCard>
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrainingVideos;
