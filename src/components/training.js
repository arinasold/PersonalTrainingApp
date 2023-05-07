import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { format } from 'date-fns';
import AddTraining from './addTraining';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Trainings() {

  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    getTrainings();
  }, []);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const getTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: "DELETE" })
        .then(response => {
          if (response.ok) {
            setMsg('Training deleted');
            setOpen(true);
            getTrainings();
          } else {
            console.error(`Failed to delete training with ID ${id}`);
            setMsg('Something went wrong in deletation!');
          }
        })
        .catch(err => console.error(err));
    }
  }


  const [columnDefs] = useState([
    {
      headerName: "Date", field: "date", sortable: true, filter: true, valueFormatter: params => {
        return params.value ? format(new Date(params.value), 'MM/dd/yyyy') : '';
      }
    },
    { headerName: "Duration", field: "duration", sortable: true, filter: true },
    { headerName: "Activity", field: "activity", sortable: true, filter: true },
    { headerName: "Customer", field: "customer.firstname", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <Button size='small' 
        color="error" 
        startIcon={<DeleteForeverIcon />}
        onClick={() => deleteTraining(params.data.id)}>
        Delete
        </Button>),
    }
  ])



  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
        <AddTraining getTrainings={getTrainings} />
      </div>
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          rowData={trainings}
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
