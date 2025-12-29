import { Box, Typography, Container, Divider } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        mt: 'auto',
      }}
    >
      <Divider />
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            py: 3, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Admin Dashboard. All Rights Reserved.
          </Typography>
          
          <Typography variant="caption" color="text.disabled" sx={{ letterSpacing: 1 }}>
            V1.0.2
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;