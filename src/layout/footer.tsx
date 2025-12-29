import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      width: '100%',
      py: 2, 
      textAlign: 'center', 
      bgcolor: 'white', 
      borderTop: '1px solid #ddd',
      mt: 'auto'
    }}
  >
    <Typography variant="body2" color="textSecondary">
      © 2025 Admin Dashboard | All Rights Reserved
    </Typography>
  </Box>
);

export default Footer;