import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer(props) {

    const [customer, setCustomer] = React.useState({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      email: props.customer.email,
      phone: props.customer.phone,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city
    });
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
            setCustomer(customer);
            setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSave = () => {
      props.updateCustomer(customer, props.customer.links[0].href);
      setOpen(false);
      
    };
  
    return (
      <div>
        <Button variant="outlined" startIcon={<EditIcon/>} onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Firstname"
              name='firstname'
              value={customer.firstname}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, firstname: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name='lastname'
              label="Lastname"
              value={customer.lastname}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, lastname: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              name='email'
              value={customer.email}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name='phone'
              label="Phone"
              value={customer.phone}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
            <TextField
              margin="dense"
              name='streetaddress'
              label="Streetaddress"
              value={customer.streetaddress}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, streetaddress: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Postcode"
              name='postcode'
              value={customer.postcode}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, postcode: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="City"
              name='city'
              value={customer.city}
              fullWidth
              variant="standard"
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
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
  