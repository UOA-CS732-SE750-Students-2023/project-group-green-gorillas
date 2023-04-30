import React from "react";
import { TemplatePreviewProps } from "./index";
import { Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ previewTemp }) => {
    if (!previewTemp) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
            <Typography variant="h6">No template selected.</Typography>
        </Box>;
    }

    const isBlankRetrospective = previewTemp.name === "Blank Retrospective";

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
                                    <>
                                        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                                            {section.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                            {section.description}
                                        </Typography>
                                    </>
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
                >
                    Start Retro
                </Button>
            </CardContent>
        </Card>
    );
};


