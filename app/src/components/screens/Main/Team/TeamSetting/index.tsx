import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useTeam } from "../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Role } from "../../../../../types/teamRole";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import { request } from "../../../../../api/request";
import { UPDATE_TEAM_USER } from "../../../../../api/api";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";

export const TeamSetting = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { team, getTeam } = useTeam(teamId);

  const { user } = useCurrentUser();

  const teamMembers = team?.teamMembers ?? [];

  const [selectedMember, setSelectedMember] = useState<any>(null);

  const [dialogEditRoleOpen, setDialogEditRoleOpen] = useState(false);
  const handleOpenEditRoleDialog = () => {
    setDialogEditRoleOpen(true);
  };

  const handleCloseEditRoleDialog = () => {
    setSelectedMember(null);
    setSelectedTeamRole(Role.MEMBER);
    setDialogEditRoleOpen(false);
  };

  const handleTeamRoleChange = (event: SelectChangeEvent) => {
    const teamRole = event.target.value as Role;
    setSelectedTeamRole(teamRole);
  };

  const [selectedTeamRole, setSelectedTeamRole] = useState(Role.MEMBER);

  const handleEditTeamRole = async () => {
    const newTeamUser = {
      userId: selectedMember.id,
      userTeamRole: selectedTeamRole,
      teamId: teamId,
    };
    try {
      await request.put(UPDATE_TEAM_USER(), newTeamUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await getTeam();
    } catch (error) {}
    handleCloseEditRoleDialog();
  };

  const teamMemberColumns = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "displayName", headerName: "Display Name", width: 130 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "role", headerName: "Team Role", width: 130 },
    {
      field: "active",
      headerName: "Active",
      width: 130,
      renderCell: (params: any) => (params.value ? "Yes" : "No"),
    },
    {
      field: "editRole",
      headerName: "",
      width: 100,
      renderCell: (params: any) => {
        if (params.row.id === user?.id) return null;

        if (params.row.role === "LEADER") return null;

        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setSelectedMember(params.row);
              setSelectedTeamRole(params.row.role);
              handleOpenEditRoleDialog();
            }}
          >
            Edit Role
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 10, width: "100%" }}>
        <Box sx={{ height: "70vh", width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={teamMembers}
            columns={teamMemberColumns}
            pagination
            pageSizeOptions={[5, 10, 25, 50, 100]}
          />
        </Box>
      </Box>
      <Dialog open={dialogEditRoleOpen} onClose={handleCloseEditRoleDialog}>
        <DialogTitle>Edit Team Role</DialogTitle>
        <DialogContent>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="edi-teamrole-label">Team Role</InputLabel>
              <Select
                labelId="edit-teamrole-label"
                id="edit-teamrole"
                value={selectedTeamRole}
                label="Team Role"
                onChange={handleTeamRoleChange}
                defaultValue={Role.MEMBER}
              >
                <MenuItem value={Role.TEMPORARY_LEADER}>
                  {Role.TEMPORARY_LEADER}
                </MenuItem>
                <MenuItem value={Role.MEMBER}>{Role.MEMBER}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditRoleDialog}>Cancel</Button>
          <Button onClick={handleEditTeamRole}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
