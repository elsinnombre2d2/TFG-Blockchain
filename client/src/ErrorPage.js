// ErrorPage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" component="h1" color="error" gutterBottom>
        {errorCode || 'Error'}
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        {errorMessage || 'Algo salió mal. Por favor, intenta de nuevo más tarde.'}
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Volver a la página principal
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
