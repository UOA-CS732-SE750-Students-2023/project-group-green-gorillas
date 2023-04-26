import React from 'react';
import {TemplatePreviewProps} from "./index";
import {NavLink} from "react-router-dom";
import {Typography, Button} from "@mui/material";

const TemplatePreview: React.FC<TemplatePreviewProps> = ({previewList}) => {

    return(
        <>
            <Typography variant="body1" color="textSecondary">Retro Details</Typography>
            <br/>
            <Typography variant="h6" fontWeight="bold">
                {previewList.title}
            </Typography>
            <div>{previewList.description}</div>
            <br/>
            <Button
                component={NavLink}
                to={"/main/retro"}
                variant="contained"
                sx={{
                    bgcolor: 'orange',
                    color: 'white',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'darkorange'},
                    width: '100%'
                }}
            >
                Start Retro
            </Button>
        </>
    );
}

export default TemplatePreview;