import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/slice/authSlice';
import { type RootState } from '../redux/store';
import logo from '../assets/zoho-200px-50px-05-2048x512.png';

const navItems = [
  { label: 'Menu 1', path: '/dashboard/menu1' },
  { label: 'Menu 2', path: '/dashboard/menu2' },
  { label: 'Menu 3', path: '/dashboard/menu3' },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logoutAction());
    handleMenuClose();
    navigate('/login');
  };

  const displayName = user 
  ? user.charAt(0).toUpperCase() + user.slice(1) 
  : 'Admin';

  return (
    <AppBar position="fixed" elevation={1} sx={{ zIndex: 1201, bgcolor: '#fff', color: '#2d3436' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component={Link} to="/dashboard" sx={{ display: 'flex', mr: 4 }}>
            <img src={logo} alt="Logo" style={{ height: 35, objectFit: 'contain' }} />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  textTransform: 'none',
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  fontWeight: location.pathname === item.path ? 600 : 400
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography 
            variant="body2" 
            sx={{ cursor: 'pointer', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
            onClick={handleMenuOpen}
          >
            {displayName || 'Admin User'}
          </Typography>
          <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 0.5 }}>
            <AccountCircle fontSize="large" />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout} sx={{ minWidth: 120, fontSize: '0.9rem' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;