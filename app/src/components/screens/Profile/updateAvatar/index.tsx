import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {CssBaseline, Paper, Container, Box, Input, Button, CardMedia, Grid, Card} from "@mui/material";
import {ProfilePath} from "../index";

import {useHistory} from 'react-router-dom';
import {MainScreenPath} from "../../Main";

export const UpdateAvatar: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // const [images, setImages] = useState<any>([]);

    const history = useHistory();

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file);
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setPreviewImage(null);
        }
    };

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        console.log('test');
        const imageContent = event.currentTarget.src;
        setPreviewImage(imageContent);
    };




    // useEffect(() => {
    //     async function fetchImages() {
    //         const imageFiles = await importAll(import.meta.glob('./public/vite.svg'));
    //         console.log(imageFiles);
    //         setImages(imageFiles);
    //     }
    //
    //     fetchImages();
    // }, []);



    const handleSave = () => {
        // Send selectedFile to server for saving
    };

    const backToProfile = () => {
        history.push(MainScreenPath.Profile)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container sx={{
                marginTop: '100px',
                maxWidth:"100%"
            }}
            >
                <Avatar
                    src={previewImage || 'defaultAvatar.png'}
                    sx={{
                        position: 'relative',
                        width: 180, height: 180,
                        zIndex: 1,
                        backgroundColor: 'white',
                        marginLeft: '50%'
                    }}
                > <img
                    src="../../public/defaultAvatar.svg"
                    style={{
                        position: 'relative',
                        width: '100%', height: '100%',

                    }}
                />
                </Avatar>


                <Box
                    sx={{width:'100%', marginTop:'5%'}}
                    position="relative">
                    <Paper
                        variant="outlined"
                        component="label"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 62,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'background.paper',
                            boxShadow: 2,
                            cursor: 'pointer',
                        }}
                    >
                        <Input
                            type="file"
                            sx={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <img src="../../public/uploadAvatar.svg" style={{
                            position: 'relative',
                            width: '100%', height: '100%',
                            zIndex: 1
                        }}
                             alt="upload" />
                    </Paper>
                </Box>


                <Paper sx={{ overflowX: 'auto', width:'100%', marginTop:'7%', position:"relative" }} elevation={5}>
                    <Grid container spacing={2} sx={{ padding: 2 }} >

                        <Grid item >

                            <Card >
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/1.svg"
                                    alt="Image 1"

                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/2.svg"
                                    alt="Image 2"

                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/3.svg"
                                    alt="Image 4"

                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/4.svg"
                                    alt="Image 3"

                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/5.svg"
                                    alt="Image 5"

                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/6.svg"
                                    alt="Image 6"
                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image="../../public/Avatar/7.svg"
                                    alt="Image 7"
                                    onClick={handleImageClick}
                                />
                            </Card>
                        </Grid>

                        {/*{images.map((image: any, index: any) => (*/}
                        {/*    <Grid item key={index}>*/}
                        {/*        <Card>*/}
                        {/*            <CardMedia component="img" image={image.src} alt={image.alt} />*/}
                        {/*        </Card>*/}
                        {/*    </Grid>*/}
                        {/*))}*/}
                        {/* Add more Grid items as needed */}
                    </Grid>
                </Paper>


                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={1}>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={backToProfile}>Back</Button>
                </Box>


            </Container>
        </React.Fragment>
    );
}

