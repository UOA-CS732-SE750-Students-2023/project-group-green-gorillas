import * as React from 'react';
import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert, { AlertProps } from '@mui/material/Alert';

interface User {
  name: string;
  age: number;
  id: GridRowId;
  dateCreated: Date;
  lastLogin: Date;
}

const useFakeMutation = () => {
  return React.useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    [],
  );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.age !== oldRow.age) {
    return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid rows={rows} columns={columns} processRowUpdate={processRowUpdate} />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

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
    { id: 3, email: 'admin01@gmail.com', organisationId: 1, displayName: 'Admin01', firstName: 'AA', lastName: 'Wang', role: 'ADMIN', active: 'Y', createdAt: '05/01/2023', updatedAt: '06/01/2023'}
  ];