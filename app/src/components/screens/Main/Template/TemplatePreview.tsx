import React, {useEffect, useRef, useState} from "react";
import {Template, TemplatePreviewProps} from "./index";
import { Card, CardContent, Typography, Button, Box, Divider, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import {request} from "../../../../api/request";
import {CREATERETRO, ISRETROACTIVE} from "../../../../api/api";
import {NavLink} from "react-router-dom";

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ previewTemp, tID }) => {

    if (!previewTemp) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
            <Typography variant="h6">No template selected.</Typography>
        </Box>;
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [retroName, setRetroName] = useState<string>("");

    async function createRetrospective(teamId: string, name: string, templateId: string) {
        const data = {
            teamId: teamId,
            name: name,
            templateId: templateId,
        };
        try {
            const response = await request.post(CREATERETRO, data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const [isRetroActiveIdentifier, setIsRetroActiveIdentifier] = useState(false);

    async function isRetroActive(){
        const response = await request.get(ISRETROACTIVE(tID));
        setIsRetroActiveIdentifier(response.data);
        return response.data;
    }

    isRetroActive();

    const isBlankRetrospective = previewTemp.name === "Blank Retrospective";

    function startRetroHandler() {
        setOpenDialog(true);
    };

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRetroName(event.target.value);
    }

    function handleClose() {
        setOpenDialog(false);
    }

    function handleButtonClick() {
        setOpenDialog(false);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(`Entered name: ${retroName}`);
        setOpenDialog(false);
        const result = await createRetrospective(tID, retroName, previewTemp.id);
        console.log(result);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    Retro Details
                </Typography>
                <br />
                <Typography variant="h6" fontWeight="bold">
                    {previewTemp.name}
                </Typography>
                <div>{previewTemp.descriptionLong}</div>
                <br />
                {!isBlankRetrospective && (
                    <>
                        <Typography variant="body2" color="textSecondary">
                            How to Run
                        </Typography>

                        <Box sx={{ bgcolor: "grey.100", borderRadius: "8px", border: "1px solid grey", p: 2 }}>
                            {previewTemp &&
                                previewTemp.boardTemplateSections.map((section: any) => (
                                    <div key={uuidv4()}>
                                        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                                            {section.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                            {section.description}
                                        </Typography>
                                    </div>
                                ))}
                        </Box>
                    </>
                )}

                <Button
                    component={NavLink}
                    to={"/main/retro"}
                    variant="contained"
                    sx={{
                        bgcolor: "orange",
                        color: "white",
                        borderRadius: "8px",
                        "&:hover": { bgcolor: "darkorange" },
                        width: "100%",
                        mt: isBlankRetrospective ? 2 : 4, // add some margin if it's the only button
                    }}

                    onClick={() => {startRetroHandler()}}
                    disabled={isRetroActiveIdentifier}
                >
                    Start Retro
                </Button>
            </CardContent>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{ textAlign: 'center' }}>Please enter your retrospective name:</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            value={retroName}
                            onChange={handleNameChange}
                            autoFocus
                            style={{ marginTop: '5px' }}
                        />
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button onClick={handleClose} style={{ backgroundColor: 'grey', color: 'white', marginRight: '10px' }}>Cancel</Button>
                        <Button onClick={handleButtonClick} type="submit" color="primary" style={{ backgroundColor: 'purple', color: 'white' }}>Submit</Button>
                    </DialogActions>

                </form>
            </Dialog>
        </Card>
    );
};


