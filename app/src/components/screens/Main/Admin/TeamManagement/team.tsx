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
import { TEAM_LIST } from '../../../../../api/api';
import { UseRole } from '../../../../../types/user';

interface Team {
  id: string;
  name: string;
  organisationId: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
}


export default function UpdateTeam() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

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

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
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
            setSelectedTeam(params.row as Team);
            handleOpenDialog();
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
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<Team[]>([]);

  const getTeamList = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<Team[]>(TEAM_LIST());
      setTeam(data);
      console.log(data);
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
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveName = () => {
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
      handleCloseDialog();
    }
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={team} columns={columns} />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit team name</DialogTitle>
        <DialogContent>
          <input type="text" defaultValue={selectedTeam?.name} ref={nameInputRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveName}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}