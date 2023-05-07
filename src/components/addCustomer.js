import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function AddCustomer(props) {

  const [customer, setCustomer] = React.useState(
    {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
      city: ""
    }
  )

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
    setCustomer(
      {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
      }
    )
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<PersonAddAlt1Icon />}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Streetaddress"
            value={customer.streetaddress}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            fullWidth
            variant="standard"
            onChange={e => setCustomer({ ...customer, city: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}