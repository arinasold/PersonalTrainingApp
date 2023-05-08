import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './components/customer';
import Trainings from './components/training';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Statistics from './components/statisticsPage';
import CalendarForTrainings from './components/calender';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Personal trainer app</Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/customers">
                Customers
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/trainings">
                Trainings
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/calender">
                Calendar
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/statistics">
                Statistics
              </MenuItem>
            </Menu>
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
