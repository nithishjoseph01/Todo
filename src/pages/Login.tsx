import React, { useState } from 'react';
import { 
  Box, Button, TextField, Typography, Paper, Avatar, Container,
  InputAdornment, IconButton, Alert, Fade 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/slice/authSlice';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (credentials.username === "admin" && credentials.password === "admin@123") {
      dispatch(loginAction(credentials.username));
      navigate('/dashboard/menu1'); 
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        p: 2
      }}
    >
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <Paper 
            elevation={24} 
            sx={{ 
              p: { xs: 3, sm: 5 }, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
              Portal Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Access your dashboard below
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 4, 
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginPage;