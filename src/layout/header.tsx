import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/zoho-200px-50px-05-2048x512.png'
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#ffffff', color: '#333' }}>
      <Toolbar>
        <Box 
          component={Link} 
          to="/dashboard" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            mr: 4 
          }}
        >
          <img 
            src={logo}
            alt="Iouring Company Logo"
            style={{ height: '40px', objectFit: 'contain' }} 
          />
        </Box>
        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/dashboard/menu1" sx={{ textTransform: 'none' }}>Menu 1</Button>
          <Button color="inherit" component={Link} to="/dashboard/menu2" sx={{ textTransform: 'none' }}>Menu 2</Button>
          <Button color="inherit" component={Link} to="/dashboard/menu3" sx={{ textTransform: 'none' }}>Menu 3</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="body1" 
            onClick={handleMenuOpen} 
            sx={{ cursor: 'pointer', mr: 1, fontWeight: 500 }}
          >
            Admin User
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;