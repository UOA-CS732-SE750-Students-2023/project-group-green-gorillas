import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Typography,
    Grid,
    TextField,
    Paper,
    Divider,
    CssBaseline,
} from "@mui/material";

import {useHistory} from 'react-router-dom';


export enum ProfilePath {
    UpdateAvatar = "/main/profile_avatar"
}



export const ProfileScreen = () => {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

  const history = useHistory();

  // TODO route
  const resetPassword = () => {
     history.push('')
  }

  const updateAvatar = () => {
      history.push(ProfilePath.UpdateAvatar)
  }

  return (
      <React.Fragment>
          <CssBaseline />
          <Container sx={{
              marginTop: '100px',
              maxWidth:"100%"
          }}
              >
              <Box sx={{
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:"center",
              }}>

                  <Avatar
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      sx={{
                          position: 'relative',
                          width: 180, height: 180,
                          zIndex: 1,
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                      onClick={updateAvatar}
                  >
                      <img
                          src="../../public/defaultAvatar.svg"
                          alt="overlay"
                          style={{
                              position: 'relative',
                              width: '100%', height: '100%',
                              zIndex: 1
                          }}
                      />

                      {isHovering && (
                          <img
                              src="../../public/updateAvatar.svg"
                              style={{
                                  position: 'absolute',
                                  marginTop: '63%',
                                  marginLeft: '2%',
                                  width: '30%',
                                  height: '30%',
                                  zIndex: 3
                              }}
                          />
                      )}
                  </Avatar>

                  <Typography marginTop={2} component="h1" variant="h3">
                      Welcome, User
                  </Typography>

                  <Paper sx={{width:'100%', marginTop:'5%'}} elevation={5}>
                          <Grid sx={{
                              marginLeft: '3%',
                              marginTop: '3%'
                          }}>
                              <Typography component="h1" variant="h5">Basic info</Typography>
                          </Grid>

                          <Grid container spacing={-2}
                                alignItems="center"
                          >
                              <Grid
                                  item xs={3}
                                  sx={{
                                      align:"left",
                                      marginLeft: '3%'
                              }} >
                                  {/*//TODO*/}
                                  <Typography>Display Name </Typography>
                              </Grid>

                              <Grid
                                  item xs={3}
                                  sx={{
                                  align:"center"
                              }}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="displayName"
                                      name="displayName"
                                      autoComplete="username"
                                      autoFocus
                                  />
                              </Grid>

                              <Button
                                  sx={{
                                  marginLeft: '5%'
                              }} disableElevation
                                      variant="contained"
                                      aria-label="Disabled elevation buttons">Update</Button>

                          </Grid>
                          <Divider />
                          <Grid container spacing={-2}
                                alignItems="center">

                              <Grid  item xs={3}
                                     sx={{
                                         align:"left",
                                         marginLeft: '3%'
                                     }} >
                                  {/*//TODO*/}
                                  <Typography>Birthday </Typography>
                              </Grid>
                              <Grid item xs={3}
                                    sx={{
                                        align:"center"
                                    }}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="birthday"
                                      name="birthday"
                                      autoComplete="birthday"
                                  />
                              </Grid>

                              <Button sx={{
                                  marginLeft: '5%',
                              }} disableElevation
                                      variant="contained"
                                      aria-label="Disabled elevation buttons">Update</Button>

                          </Grid>
                          <Divider />
                          <Grid container spacing={-2} alignItems="center">
                              <Grid item xs={3}
                                    sx={{
                                        align:"left",
                                        marginLeft: '3%'
                                    }}>
                                  {/*//TODO*/}
                                  <Typography>Gender </Typography>
                              </Grid>
                              <Grid  item xs={3}
                                     sx={{
                                         align:"center"
                                     }}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="gender"
                                      name="gender"
                                      autoComplete="gender"
                                  />
                              </Grid>

                              <Button sx={{
                                  marginLeft: '5%',
                              }} disableElevation
                                      variant="contained"
                                      aria-label="Disabled elevation buttons">Update</Button>

                          </Grid>
                      </Paper>


                  <Paper sx={{width:'100%', marginTop:'5%'}} elevation={5}>
                      <Grid sx={{
                          marginLeft: '3%',
                          marginTop: '3%'
                      }}>
                          <Typography component="h1" variant="h5">Contact info</Typography>
                      </Grid>

                      <Grid container spacing={-2}
                            alignItems="center"
                      >
                          <Grid
                              item xs={3}
                              sx={{
                                  align:"left",
                                  marginLeft: '3%'
                              }} >
                              {/*//TODO*/}
                              <Typography>Email </Typography>
                          </Grid>

                          <Grid
                              item xs={3}
                              sx={{
                                  align:"center"
                              }}>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="email"
                                  name="email"
                                  autoComplete="email"
                              />
                          </Grid>

                          <Button
                              sx={{
                                  marginLeft: '5%'
                              }} disableElevation
                              variant="contained"
                              aria-label="Disabled elevation buttons">Update</Button>

                      </Grid>
                      <Divider />
                      <Grid container spacing={-2}
                            alignItems="center">

                          <Grid  item xs={3}
                                 sx={{
                                     align:"left",
                                     marginLeft: '3%'
                                 }} >
                              {/*//TODO*/}
                              <Typography>Phone </Typography>
                          </Grid>
                          <Grid item xs={3}
                                sx={{
                                    align:"center"
                                }}>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="phone"
                                  name="phone"
                                  autoComplete="phone"
                              />
                          </Grid>

                          <Button sx={{
                              marginLeft: '5%',
                          }} disableElevation
                                  variant="contained"
                                  aria-label="Disabled elevation buttons">Update</Button>

                      </Grid>
                  </Paper>

                  <Paper sx={{width:'100%', marginTop:'5%'}} elevation={5}>
                      <Grid sx={{
                          marginLeft: '3%',
                          marginTop: '3%'
                      }}>
                          <Typography component="h1" variant="h5">Security</Typography>
                      </Grid>

                      <Grid container spacing={-2}
                            alignItems="center"
                            sx={{
                                my:'3%'
                            }}
                      >
                          <Grid
                              item xs={3}
                              sx={{
                                  align:"left",
                                  marginLeft: '3%'
                              }} >
                              {/*//TODO*/}
                              <Typography>Password</Typography>
                          </Grid>


                          <Button
                              sx={{
                                  marginLeft: '5%'
                              }} disableElevation
                              variant="contained"
                              aria-label="Disabled elevation buttons"
                              onClick={resetPassword}
                          >Reset
                          </Button>

                      </Grid>

                  </Paper>


                  {/*<Link to="/">Back to Home</Link>*/}

              </Box>

          </Container>
      </React.Fragment>
  );
};
