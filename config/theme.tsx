import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins'
    ].join()
  },
  palette: {
    background: {
      default: '#f5f6fa'
    },
    primary: {
      main: '#e1b12c',
    },
    secondary: {
      main: '#192a56',
    },
    error: {
      main: '#c23616',
    },
  },
});
export default theme;