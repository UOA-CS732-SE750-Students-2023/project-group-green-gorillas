import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridRowId,
  GridRowsProp,
  GridRowParams,
} from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { request } from '../../../../../api/request';
import { USER_LIST } from '../../../../../api/api';
import { UseRole } from '../../../../../types/user';

interface User {
  id: string;
  email: string;
  organisationId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: UseRole;
  phone: string;
  address: string;
  gender: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}


export default function UpdateUser() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const displayNameInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const roleSelectRef = useRef<HTMLSelectElement>(null);


  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'displayName', headerName: 'Display Name', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'role', headerName: 'User Role', width: 130 },
    { field: 'active', headerName: 'Active', width: 130 },
    {
      field: 'edit',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedUser(params.row as User);
            handleOpenDialog();
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([]);

  const getUserList = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<User[]>(USER_LIST());
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveName = () => {
    const userId = selectedUser?.id;
    console.log(userId);
    const updatedDisplayName = displayNameInputRef.current?.value;
    const updatedFirstName = firstNameInputRef.current?.value;
    const updatedLastName = lastNameInputRef.current?.value;
    const updatedRole = roleInputRef.current?.value;
    if (selectedUser && firstNameInputRef.current && lastNameInputRef.current && displayNameInputRef.current) {
      // Make API request to update the user name here...
      const updatedUser = {
        displayName: updatedDisplayName,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        role: updatedRole,
        phone: selectedUser?.phone,
        address: selectedUser?.address,
        active: true,
        gender: selectedUser?.gender
      }
      try {
        request.put(`http://localhost:8080/api/user/${userId}`, updatedUser, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('User updated successfully', response.data);
            // Update the user in the UI state or trigger a re-fetch
            getUserList();
          })
      }
      catch (error) {
        console.error('Failed to update user', error);
        // Handle error, e.g. display a message to the user
      };

      console.log(`Updating user ${selectedUser.id} name to "${displayNameInputRef.current.value} + ' ' +${firstNameInputRef.current.value} + ' ' + ${lastNameInputRef.current.value}"`);
      handleCloseDialog();
    }
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={user} columns={columns} />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="displayName">Display Name:  </label>
            <input type="text" id="displayName" defaultValue={selectedUser?.displayName} ref={displayNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="firstName">First Name:  </label>
            <input type="text" id="firstName" defaultValue={selectedUser?.firstName} ref={firstNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="lastName">Last Name:  </label>
            <input type="text" id="lastName" defaultValue={selectedUser?.lastName} ref={lastNameInputRef} style={{ width: "55%" }}  />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <label htmlFor="role">User Role:  </label>
            <select id="role" defaultValue={selectedUser?.role} ref={roleSelectRef} style={{ width: "55%" }}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveName}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}