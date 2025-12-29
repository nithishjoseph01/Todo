import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Toolbar /> 

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          bgcolor: (theme) => theme.palette.grey[50],
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default DashboardLayout;