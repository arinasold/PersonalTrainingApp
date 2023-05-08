import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './addCustomer';
import EditCustomer from './editCustomer';
import { CSVLink} from "react-csv"
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function CustomerList() {

  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getCustomers();
  }, []);


  const getCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  }

  const [columnDefs] = useState([
    { field: 'firstname', sortable: true, filter: true, floatingFilter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, floatingFilter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, width: 200 },
    { field: 'postcode', sortable: true, filter: true, floatingFilter: true, width: 150 },
    { field: 'city', sortable: true, filter: true, floatingFilter: true, width: 150 },
    { field: 'email', sortable: true, filter: true, floatingFilter: true, width: 150 },
    { field: 'phone', sortable: true, filter: true, floatingFilter: true, width: 150 },
    {
      headerName: "",
      width: 120,
      field: "links.0.href",
      cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
    },
    {
      headerName: "",
      width: 150,
      field: "links.0.href",
      cellRenderer: params =>
        <Button size='small' color="error" startIcon={<DeleteForeverIcon/>} onClick={() => deleteCustomer(params.value)} >
          Delete
        </Button>,
    }])

  const addCustomer = (customer) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          getCustomers();
          setMsg("New customer added!");
          setOpen(true);
        }
        else
          setMsg('Something went wrong!')
      })
      .catch(err => console.error(err))

  }

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted successfully");
            setOpen(true);
            getCustomers();
          } else {
            setMsg("Something went wrong with deletation!");
          }
        });
    }
  };

  const updateCustomer = (updatedCustomer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedCustomer)
    })
      .then(response => {
        if (response.ok) {
          getCustomers();
          setOpen(true);
          setMsg('Customer updated!')
        }
        else
          setMsg('Something went wrong with update!')
      })
      .catch(err => console.error(err))

  }

  const exportCustomersToCSV = () => {
    return customers.map(customer => ({
      firstname: customer.firstname,
      lastname: customer.lastname,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city,
      email: customer.email,
      phone: customer.phone,
    }));
  };




  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', margin: '20px'}}>
      <AddCustomer 
      addCustomer={addCustomer}
      />
      <CSVLink
        data={exportCustomersToCSV()}
        filename={"customers.csv"}>
        <Button 
        variant="outlined"
        color="primary"
        startIcon={<DownloadIcon/>}>
        Download CSV
        </Button>
      </CSVLink>
      </div>
      <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
      <AgGridReact
          pagination={true}
          paginationPageSize={10}
          rowData={customers}
          columnDefs={columnDefs}
        />
      </div>
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
