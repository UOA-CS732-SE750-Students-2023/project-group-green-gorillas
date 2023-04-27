import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


/*
  id: string;
  name: string;
  organisationId: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
*/

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'organisationId', headerName: 'OrgID', width: 70 },
  { field: 'active', headerName: 'Active', width: 130 },
  { field: 'createdAt', headerName: 'CreatedAt', width: 130 },
  { field: 'updatedAt', headerName: 'UpdatedAt', width: 130 },
];

const rows = [
  { id: 1, name: 'Kiwi Fruit', organisationId: 1, active: 'Y', createdAt: '05/01/2023', updatedAt: '06/01/2023'},
  { id: 2, name: 'Apple Tree', organisationId: 1, active: 'Y', createdAt: '05/01/2023', updatedAt: '06/01/2023'},
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
