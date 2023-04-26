import React, { useEffect } from "react";
import TemplateList from "./TemplateList";
import { Typography , Box} from '@mui/material';

const templates = [
    { id: 1, title: 'Start, Stop, Continue', briefDescription:'Come up with practical ideas for team based improvement', description: 'When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away.'},
    { id: 2, title: 'Went well, did not go well', briefDescription:'Focus on your team strengths and weaknesses', description: 'When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away. '},
    { id: 3, title: 'Mad, sad, Glad', briefDescription:'Figure out how the team is currently feeling', description: 'When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away. '},
    { id: 4, title: 'Blank Retrospective', briefDescription:'Create your own retro', description: 'When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away. '},

];

export type Template = {
    id: number;
    title: string;
    briefDescription: string;
    description: string;
};

export type TemplateListProps = {
    templates: Template[];
};

export type TemplatePreviewProps = {
    previewList: Template;
};

export const TemplateScreen = () => {

  return (
    <Box p={2}>
      <h1>Create retro for Demo Team</h1>
        <Typography variant="body1" color="textSecondary">Select retro template</Typography>
        <br/>
        <TemplateList templates={templates}/>

    </Box>
  )
};
