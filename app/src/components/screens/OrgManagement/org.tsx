import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


/*
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
*/

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130, editable: true},
  { field: 'createdAt', headerName: 'CREATE', width: 130 },
  { field: 'updatedAt', headerName: 'UPDATE', width: 130 },
  { field: 'active', headerName: 'Active', width: 130 },
];

const rows = [
  { id: 1, name: 'Snowman', createdAt: '01012000' , updatedAt: '01012023', active: 'Y' },

];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        checkboxSelection
      />
    </div>
  );
}
