import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, FormControl, Select, OutlinedInput, FormHelperText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from '@mui/icons-material/Add';


export default function AddTraining(props) {

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: '',
    duration: '',
    customer: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => {

        setCustomers(data.content);
      })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(training)
    })
      .then(response => {
        props.getTrainings();
        setOpen(false);
      })
      .catch(err => console.error(err))
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value })
  };

  const handleDateChange = (date) => {
    setTraining({ ...training, date })
  };

  return (
    <div>

      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        New Training
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth='sm'
      >
        <DialogTitle>New Training</DialogTitle>

        <DialogContent style={{ paddingTop: "10px" }} >

          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateTimePicker
              label="Date and Time"
              value={training.date}
              onChange={handleDateChange}
              input={(props) => <TextField {...props} />}

            />

          </LocalizationProvider>

          <TextField
            label="Activity"
            variant="outlined"
            size="small"
            style={{ width: '300px', marginRight: '10px' }}
            name="activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            margin="normal"

          />
          <TextField
            label="Duration (minutes)"
            variant="outlined"
            size="small"
            style={{ width: '300px', marginRight: '10px' }}
            name="duration"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"


          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ width: '300px', marginRight: '10px' }}
            fullWidth
            margin="normal">
            <Select
              label="Customer"
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }}
              name="customer"
              value={training.customer}
              onChange={handleChange}
              input={<OutlinedInput label="Client's name" />}

            >
              {customers.map((customer) => (
                <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Customer's name</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
