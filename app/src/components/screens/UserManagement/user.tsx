import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


/*
  id: string;
  email: string;
  organisationId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: UseRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
*/

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 130, editable: true },
  { field: 'organisationId', headerName: 'OrgID', width: 70 },
  { field: 'displayName', headerName: 'DisplayName', width: 130, editable: true},
  { field: 'firstName', headerName: 'FirstName', width: 130, editable: true },
  { field: 'lastName', headerName: 'LastName', width: 130, editable: true },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'active', headerName: 'Active', width: 130 },
  { field: 'createdAt', headerName: 'CreatedAt', width: 180 },
  { field: 'updatedAt', headerName: 'UpdatedAt', width: 180},
];

const rows = [
  { id: 1, email: 'abc@gmail.com', organisationId: 1, displayName: 'Peter', firstName: 'YY', lastName: 'Chen', role: 'USER', active: 'Y', createdAt: '05/01/2023', updatedAt: '06/01/2023'},
  { id: 2, email: 'xyz@gmail.com', organisationId: 1, displayName: 'Amy', firstName: 'BB', lastName: 'Li', role: 'USER', active: 'Y', createdAt: '05/01/2023', updatedAt: '06/01/2023'},
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
