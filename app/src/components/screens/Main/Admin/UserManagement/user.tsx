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
import { CREATE_USER, DISABLE_USER, UPDATE_USER, USER_LIST } from '../../../../../api/api';
import { UseRole } from '../../../../../types/user';
import Box from '@mui/material/Box';

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

  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogNewOpen, setDialogNewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const displayNameInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const genderSelectRef = useRef<HTMLSelectElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const tempPwdInputRef = useRef<HTMLInputElement>(null);
  const roleSelectRef = useRef<HTMLSelectElement>(null);


  const handleDisableEnableUser = (userId: string, active: boolean) => {
    const updatedUser = { active: !active };
    try {
      request.patch(DISABLE_USER(userId), updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('User updated successfully', response.data);
        // Update the User in the UI state or trigger a re-fetch
        const updatedUsers = user.map((t) => {
          if (t.id === userId) {
            return {
              ...t,
              active: !active,
            };
          }
          return t;
        });
        setUser(updatedUsers);
      })
    }
    catch (error) {
      console.error('Failed to update user', error);
      // Handle error, e.g. display a message to the user
    };
  };


  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'displayName', headerName: 'Display Name', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    {
      field: 'gender', headerName: 'Gender', width: 130,
      renderCell: (params) => params.value ? 'Male' : 'Female'
    },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'role', headerName: 'User Role', width: 130 },
    {
      field: 'active', headerName: 'Active', width: 130,
      renderCell: (params) => params.value ? 'Yes' : 'No'
    },
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
            handleOpenEditDialog();
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'disable',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            const selectedUser = params.row as User;
            const isActive = selectedUser.active;
            console.log('current active flag: ' + isActive)
            handleDisableEnableUser(selectedUser.id, isActive);
          }}
        >
          {params.row.active ? 'Disable' : 'Enable'}
        </Button>
      ),
    }
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

  const handleOpenEditDialog = () => {
    setDialogEditOpen(true);
  };

  const handleCloseEditDialog = () => {
    setDialogEditOpen(false);
  };

  const handleOpenNewDialog = () => {
    setDialogNewOpen(true);
  };

  const handleCloseNewDialog = () => {
    setDialogNewOpen(false);
  };

  const handleSaveName = async () => {
    const userId = selectedUser?.id;
    console.log(userId);
    const updatedDisplayName = displayNameInputRef.current?.value;
    const updatedFirstName = firstNameInputRef.current?.value;
    const updatedLastName = lastNameInputRef.current?.value;
    const updatedRole = roleSelectRef.current?.value;
    const updatedGender = genderSelectRef.current?.value === "Male" ? true : false;
    const updatedPhone = phoneInputRef.current?.value;
    const updatedAddress = addressInputRef.current?.value;
    if (selectedUser && firstNameInputRef.current && lastNameInputRef.current && displayNameInputRef.current) {
      // Make API request to update the user name here...
      const updatedUser = {
        displayName: updatedDisplayName,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        role: updatedRole,
        phone: updatedPhone,
        address: updatedAddress,
        active: true,
        gender: updatedGender
      }
      try {
        await request.put(UPDATE_USER(userId!), updatedUser, {
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
      handleCloseEditDialog();
    }
  };

  const handleNewUser = async () => {
    const newUser = {
      email: emailInputRef.current?.value,
      displayName: displayNameInputRef.current?.value,
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
      role: roleSelectRef.current?.value,
      temporaryPassword: tempPwdInputRef.current?.value ?? "12345678",
      phone: phoneInputRef.current?.value ? phoneInputRef.current.value : "",
      gender: genderSelectRef.current?.value === "Male" ? true : false,
      address: addressInputRef.current?.value ? addressInputRef.current.value : "",
    }
    try {
      await request.post(CREATE_USER(), newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('New User created successfully', response.data);
        //  New User in the UI state or trigger a re-fetch
        getUserList();
      })
    }
    catch (error) {
      console.error('Failed to create user', error);
      // Handle error, e.g. display a message to the user
    };
    handleCloseNewDialog();
  };

  return (
    <>
      <div>
        <p></p>
        <Button variant="contained" color="primary" onClick={handleOpenNewDialog}>
          Create User
        </Button>
        <p></p>
      </div>
      <Box sx={{ height: 600, width: '100%', overflow: 'auto' }}>
        <DataGrid rows={user} columns={columns}
          pagination
          pageSizeOptions={[5, 10, 25, 50, 100]} />
      </Box>
      <Dialog open={dialogEditOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="email">Email:  </label>
            <input type="text" id="email" defaultValue={selectedUser?.email} ref={emailInputRef} style={{ width: "55%" }} />
          </div>
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
            <input type="text" id="lastName" defaultValue={selectedUser?.lastName} ref={lastNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="gender">Gender:  </label>
            <select id="gender" defaultValue={selectedUser?.gender ? "Male" : "Female"} ref={genderSelectRef} style={{ width: "55%" }}>
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="phone">Phone:  </label>
            <input type="text" id="phone" defaultValue={selectedUser?.phone} ref={phoneInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="address">Address:  </label>
            <input type="text" id="address" defaultValue={selectedUser?.address} ref={addressInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="role">User Role:  </label>
            <select id="role" defaultValue={selectedUser?.role} ref={roleSelectRef} style={{ width: "55%" }}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveName}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogNewOpen} onClose={handleCloseNewDialog}>
        <DialogTitle>Create new user</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="email">Email:  </label>
            <input type="text" id="email" ref={emailInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="displayName">Display Name:  </label>
            <input type="text" id="displayName" ref={displayNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="firstName">First Name:  </label>
            <input type="text" id="firstName" ref={firstNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="lastName">Last Name:  </label>
            <input type="text" id="lastName" ref={lastNameInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="phone">Phone:  </label>
            <input type="text" id="phone" ref={phoneInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="address">Address:  </label>
            <input type="text" id="address" ref={addressInputRef} style={{ width: "55%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="gender">Gender:  </label>
            <select id="gender" ref={genderSelectRef} style={{ width: "55%" }}>
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="role">User Role:  </label>
            <select id="role" ref={roleSelectRef} style={{ width: "55%" }}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="tempPwd">Temp Password: </label>
            <input type="text" id="tempPwd" ref={tempPwdInputRef} style={{ width: "55%" }} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewDialog}>Cancel</Button>
          <Button onClick={handleNewUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}