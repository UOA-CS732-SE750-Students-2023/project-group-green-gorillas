import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridRowId,
  GridRowsProp,
  GridRowParams
} from '@mui/x-data-grid';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { request } from '../../../../../api/request';
import { TEAM_LIST, USER_LIST } from '../../../../../api/api';
import { UseRole, User } from '../../../../../types/user';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { Role } from '../../../../../types/teamRole';

interface Team {
  id: string;
  name: string;
  organisationId: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
  teamMembers: User[];
}



export default function UpdateTeam() {

  const [selectedRow, setSelectedRow] = useState<Team | null>(null);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogNewOpen, setDialogNewOpen] = useState(false);
  const [dialogAddUserOpen, setDialogAddUserOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const newTeamInputRef = useRef<HTMLInputElement>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<Team | null>(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedTeamRole, setSelectedTeamRole] = useState(Role.MEMBER);

  const handleDisableEnableTeam = (teamId: string, active: boolean) => {
    const updatedTeam = { active };
    try {
      request.patch(`http://localhost:8080/api/team/update-active/${teamId}`, updatedTeam, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('Team updated successfully', response.data);
        // Update the team in the UI state or trigger a re-fetch
        const updatedTeams = team.map((t) => {
          if (t.id === teamId) {
            return {
              ...t,
              active: !active,
            };
          }
          return t;
        });
        setTeam(updatedTeams);
      })
    }
    catch (error) {
      console.error('Failed to update team', error);
      // Handle error, e.g. display a message to the user
    };
  };

  const handleRemove = (removedTeamId: string, removedUserId: string) => {
    console.log("teamId: " + removedTeamId);
    console.log("userId: " + removedUserId);
    // Make API request to update the user name here...
    const removedTeamUser = {
      teamId: removedTeamId,
      userId: removedUserId
    }
    try {
      request.delete(`http://localhost:8080/api/team/remove-team-user`, {
        data: removedTeamUser,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('Team User removed successfully', response.data);
        // Update the Team user in the UI state or trigger a re-fetch
        // Update the team in the UI state or trigger a re-fetch
        const updatedTeamMembers = teamMembers.filter((m) => m.id !== removedUserId);
        setTeamMembers(updatedTeamMembers);
        getTeamList();
      })
    }
    catch (error) {
      console.error('Failed to remove Team user', error);
      // Handle error, e.g. display a message to the user
    };
  }



  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'active', headerName: 'Active', width: 130,
      renderCell: (params) => params.value ? 'Yes' : 'No',
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
            setSelectedTeam(params.row as Team);
            handleOpenEditDialog();
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'addUser',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedTeam(params.row as Team);
            handleOpenAddUserDialog();
          }}
        >
          Add Member
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
            const selectedTeam = params.row as Team;
            const isActive = selectedTeam.active;
            handleDisableEnableTeam(selectedTeam.id, isActive);
          }}
        >
          {params.row.active ? 'Disable' : 'Enable'}
        </Button>
      ),
    }
  ];

  const teamMemberColumns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'displayName', headerName: 'Display Name', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    {
      field: 'active', headerName: 'Active', width: 130,
      renderCell: (params) => params.value ? 'Yes' : 'No'
    },
    {
      field: 'remove',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            //setSelectedUser(params.row as User);
            console.log("before remove");
            handleRemove(selectedTeamId, params.row.id);
            console.log("after remove");
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const getTeamList = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<Team[]>(TEAM_LIST());
      const teamsWithMembers = data.map((team) => {
        const teamMembers = team.teamMembers.map((member) => ({
          ...member,
          id: member.id.toString(),
        }));
        return {
          ...team,
          teamMembers: teamMembers,
        };
      });
      setTeam(teamsWithMembers);
      console.log("TeamWithMembers: "+ teamsWithMembers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getTeamList();
    })();
  }, [teamMembers]);

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
  const handleOpenAddUserDialog = () => {
    setDialogAddUserOpen(true);
    populateUsers();
  };

  const handleCloseAddUserDialog = () => {
    setDialogAddUserOpen(false);
  };

  //const handleRowSelection = (params: GridRowParams, event: MouseEvent) => {
  const handleRowSelection = (params: GridRowParams) => {
    setSelectedRow(params.row as Team);
    console.log(`Row ${params.id} clicked!`);
    console.log(`Team Name ${params.row.name} clicked!`);
    const teamMembers = params.row.teamMembers;
    const selectedTeamId = params.row.id;
    setSelectedTeamId(selectedTeamId);
    setTeamMembers(teamMembers);
    console.log(`Team ID ${selectedTeamId} clicked!`);
    console.log(`Team Members:`, teamMembers);
  };

  const handleEditTeam = () => {
    const teamId = selectedTeam?.id;
    const updatedName = nameInputRef.current?.value;
    if (selectedTeam && nameInputRef.current) {
      // Make API request to update the team name here...
      const updatedTeam = { name: updatedName, active: true };
      try {
        request.put(`http://localhost:8080/api/team/${teamId}`, updatedTeam, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          console.log('Team updated successfully', response.data);
          // Update the team in the UI state or trigger a re-fetch
          getTeamList();
        })
      }
      catch (error) {
        console.error('Failed to update team', error);
        // Handle error, e.g. display a message to the user
      };
      console.log(`Updating team ${selectedTeam.id} name to "${nameInputRef.current.value}"`);
      handleCloseEditDialog();
    }
  };

  const handleNewTeam = () => {
    const newTeamName = { name: newTeamInputRef.current?.value };
    try {
      request.post(`http://localhost:8080/api/team`, newTeamName, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('New Team created successfully', response.data);
        //  New team in the UI state or trigger a re-fetch
        getTeamList();
      })
    }
    catch (error) {
      console.error('Failed to create team', error);
      // Handle error, e.g. display a message to the user
    };
    handleCloseNewDialog();
  };

  const populateUsers = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<User[]>(USER_LIST());
      setUsers(data);
      console.log("All users data: " + data.toString());
      setDialogAddUserOpen(true);
    } catch (error) {
      console.error('Failed to fetch users', error);
      // Handle error, e.g. display a message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeamUser = () => {
    const newTeamUser = {
      userId: selectedUserId,
      userTeamRole: selectedTeamRole,
      teamId: selectedTeamId
    };
    console.log("userId: " + selectedUserId);
    console.log("userTeamRole: " + selectedTeamRole);
    console.log("teamId: " + selectedTeamId);
    try {
      request.post(`http://localhost:8080/api/team/add-team-user`, newTeamUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('New Team User created successfully', response.data);
        //  New team in the UI state or trigger a re-fetch
        getTeamList();
      })
    }
    catch (error) {
      console.error('Failed to create team user', error);
      // Handle error, e.g. display a message to the user
    };
    handleCloseAddUserDialog();
  };

  const handleUserNameChange = (event: SelectChangeEvent) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    console.log("handleChange UserId: " + userId);
  };

  const handleTeamRoleChange = (event: SelectChangeEvent) => {
    const teamRole = event.target.value as Role;
    setSelectedTeamRole(teamRole);
    console.log("handleChange TeamRole: " + teamRole);
  };

  return (
    <>
      <div>
        <p></p>
        <Button variant="contained" color="primary" onClick={handleOpenNewDialog}>
          Create Team
        </Button>
        <p></p>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={team} columns={columns} onRowClick={handleRowSelection} />
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={teamMembers} columns={teamMemberColumns} />
        </div>
      </div>
      <Dialog open={dialogEditOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Team</DialogTitle>
        <DialogContent>
          <input type="text" defaultValue={selectedTeam?.name} ref={nameInputRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditTeam}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogNewOpen} onClose={handleCloseNewDialog}>
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <input type="text" ref={newTeamInputRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewDialog}>Cancel</Button>
          <Button onClick={handleNewTeam}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogAddUserOpen} onClose={handleCloseAddUserDialog}>
        <DialogTitle>Add User To Team</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
              <InputLabel id="select-user-label">User Name</InputLabel>
              <Select
                labelId="select-user-label"
                id="select-user"
                value={selectedUserId}
                label="User Name"
                onChange={handleUserNameChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName + " " + user.lastName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a user</FormHelperText>
            </FormControl>

          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-teamrole-label">Team Role</InputLabel>
              <Select
                labelId="select-teamrole-label"
                id="select-teamrole"
                value={selectedTeamRole}
                label="Team Role"
                onChange={handleTeamRoleChange}
              >
                <MenuItem value={Role.LEADER}>{Role.LEADER}</MenuItem>
                <MenuItem value={Role.TEMPORARY_LEADER}>{Role.TEMPORARY_LEADER}</MenuItem>
                <MenuItem value={Role.MEMBER}>{Role.MEMBER}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUserDialog}>Cancel</Button>
          <Button onClick={handleAddTeamUser}>Add</Button>
        </DialogActions>
      </Dialog >
    </>
  );
}
