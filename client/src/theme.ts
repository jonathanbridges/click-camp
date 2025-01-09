import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2B6B39', // Forest green
    },
    secondary: {
      main: '#FF6B35', // Sunset orange
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3138', // Dark gray for main text
      secondary: '#5C5F66', // Medium gray for secondary text
    }
  },
  typography: {
    fontFamily: '"Calibri", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Calibri", "Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '4.5rem',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      '@media (max-width:900px)': {
        fontSize: '3.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: '"Calibri", "Inter", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Calibri", "Inter", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: '8px 24px',
          '&:focus-visible': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(43, 107, 57, 0.3)', // Using primary color with transparency
          },
          '&.MuiButton-outlined': {
            '&:focus-visible': {
              boxShadow: '0 0 0 3px rgba(92, 95, 102, 0.2)', // Using text.secondary with transparency
            }
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
}); 