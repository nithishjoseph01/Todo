import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const DashboardLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw' 
    }}>
      <Header />
      <Toolbar /> 
      <Box component="main" sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: 3, 
        bgcolor: '#f5f7fa' 
      }}>
        <Outlet /> 
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardLayout;