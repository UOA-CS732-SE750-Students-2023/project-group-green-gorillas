import React, {useState} from 'react';
import { Template } from './index';
import { TemplateListProps } from './index';
import TemplatePreview from "./TemplatePreview";
import {Grid,Box, List, ListItem, ListItemText, Typography} from "@mui/material";



const TemplateList: React.FC<TemplateListProps> = ({templates}) => {

    const [previewList, setList] = useState(templates[0]);

    function previewTemplateHandler(selectedTemplateId: number) {
        const selectedTemplate = templates.find(template => template.id === selectedTemplateId);
        if (selectedTemplate) {
            setList(selectedTemplate);
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        {templates.map((template) => (
                            <Grid item key={template.id} xs={12} sm={6} md={4}>
                                <Box bgcolor="grey.200" sx={{ borderRadius: '8px','&:hover': { border: '1px solid blue' } }}>
                                <ListItem button onClick={() => previewTemplateHandler(template.id)}>
                                    <ListItemText
                                        primaryTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                                        primary={template.title}
                                        secondary={template.briefDescription}
                                    />
                                </ListItem></Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TemplatePreview previewList={previewList} />
                </Grid>
            </Grid>


        </>
    );
};

export default TemplateList;

