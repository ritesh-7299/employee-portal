import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Index from './routes/Index';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Index />
    </ThemeProvider>
  );
}

export default App;
