import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './components/customer';
import Trainings from './components/training';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Statistics from './components/statisticsPage';
import CalendarForTrainings from './components/calender';

function App() {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Personal trainer app</Typography>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  top: '60px',
                  left: '0px',
                  width: '140px',
                  height: '250px',
                  boxShadow: '1px 1px 5px grey',
                  zIndex: 1,
                }}
              >
                <Button
                  component={Link}
                  to="/customers"
                  color="primary"
                  style={{ margin: '10px' }}
                >
                  Customers
                </Button>
                <Button
                  component={Link}
                  to="/trainings"
                  color="primary"
                  style={{ margin: '10px' }}
                >
                  Trainings
                </Button>
                <Button
                  component={Link}
                  to="/calender"
                  color="primary"
                  style={{ margin: '10px' }}
                >
                  Calendar
                </Button>
                <Button
                  component={Link}
                  to="/statistics"
                  color="primary"
                  style={{ margin: '10px' }}
                >
                  Statistics
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/calender" element={<CalendarForTrainings />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
