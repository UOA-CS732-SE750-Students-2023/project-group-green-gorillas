import React, { useEffect, useState } from "react";
import { request } from "../../../../../api/request";
import { TEMPLATE } from "../../../../../api/api";
import {
  Grid,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import { TemplatePreview } from "./TemplatePreview";
import { TeamDrawer } from "../../../../common/TeamDrawer";
import { useTeam } from "../../../../../hooks/useTeam";
import { useParams } from "react-router-dom";
import { useTeamRole } from "../../../../../hooks/useTeamRole";
import { TeamRole } from "../../../../../types/teamRole";

export type Template = {
  boardTemplateSections: TemplateSection[];
  createdAt: string;
  createdBy: string;
  description: string;
  descriptionLong: string;
  id: string;
  name: string;
  organisationId: string;
  updatedAt: string;
};
export type TemplateSection = {
  description: string;
  name: string;
  order: number;
};

export type TemplateListProps = {
  templates: Template[];
};

export type TemplatePreviewProps = {
  previewTemp: Template;
  tID: string;
  teamRole: TeamRole | null;
};

export const TemplateScreen = () => {
  const [temps, setTemps] = useState<any>([]);

  const [previewTemp, setPreviewTemp] = useState<any>(temps[0]);

  function buttonOnClickhandler(id: string) {
    temps.map((i: Template) => {
      if (i.id === id) {
        setPreviewTemp(i);
      }
    });
  }

  const { teamId } = useParams<{ teamId: string }>();

  const { team } = useTeam(teamId);

  const { teamRole } = useTeamRole(teamId);


  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await request.get<Template[]>(TEMPLATE());
        setTemps(data);
        if (data.length > 0) {
          setPreviewTemp(data[0]); // Set the first template as the default previewTemp
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <Grid sx={{ marginTop: 1 }} container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box
          marginY={2}
          sx={{ width: "100%", display: "flex", alignItems: "flex-end" }}
        >
          <Box sx={{ flex: "1" }}>
            <h1>Create retro for {team?.name}</h1>
            <Typography variant="body1" color="textSecondary">
              Select retro template
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {temps.map((i: Template) => (
            <Grid item key={i.id} xs={12} sm={6} md={4}>
              <Box
                bgcolor="grey.200"
                sx={{
                  borderRadius: "8px",
                  "&:hover": { border: "1px solid blue" },
                }}
              >
                <ListItem onClick={() => buttonOnClickhandler(i.id)}>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      fontWeight: "bold",
                    }}
                    primary={i.name}
                    secondary={i.description}
                  />
                </ListItem>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} md={10} lg={10}>
            <Box sx={{ border: "none" }}>
              <TemplatePreview previewTemp={previewTemp} tID={teamId} teamRole={teamRole}/>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
