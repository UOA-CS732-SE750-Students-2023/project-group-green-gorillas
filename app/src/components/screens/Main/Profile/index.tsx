import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    TextField,
    Paper,
    Divider,
    CssBaseline,
    FormControl,
    MenuItem, Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fade
} from "@mui/material";

import {useHistory} from 'react-router-dom';
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { request } from "../../../../api/request";
import {CURRENT_USER, CHANGE_PASSWORD} from "../../../../api/api";


export enum ProfilePath {
    UpdateAvatar = "/main/profile_avatar"
}

interface UserData {
    displayName: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    gender: boolean;
}

export const ProfileScreen = () => {

    const {user} = useCurrentUser();

    const [userData, setUserData] = useState<UserData | null>({
        displayName: user!.displayName,
        firstName: user!.firstName,
        lastName: user!.lastName,
        phone: user!.phone,
        address: user!.address,
        gender: user!.gender,
    });


    // Avatar animation
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    // Update UserInfo
    const[currentUserData, setCurrentUserData] = useState<Object | null>(null);


   const history = useHistory();

  // cancelUpdate
  const cancelUpdate = () => {
      history.go(0);
  }


    const[currentDisplayName, setCurrentDisplayName] = useState<string>(userData!.displayName);
    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentDisplayName(event.target.value);
    }

    const[currentFirstName, setCurrentFirstName] = useState<string>(userData!.firstName);
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFirstName(event.target.value);
    }

    const[currentLastName, setCurrentLastName] = useState<string>(userData!.lastName);
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLastName(event.target.value);
    }

    const[currentGender, setCurrentGender] = useState<string>(userData!.gender ? 'male':'female');
    const handleGenderChange = (event: any) => {
        setCurrentGender(event.target.value);
    }


    const[currentAddress, setCurrentAddress] = useState<string>(userData!.address);
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAddress(event.target.value);
    }



  const[currentPhone, setCurrentPhone] = useState<string>(userData!.phone);
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPhone(event.target.value);
    }





    const updateInfo = () => {

        userData!.displayName = currentDisplayName;
        userData!.firstName = currentFirstName;
        userData!.lastName = currentLastName;
        userData!.phone = currentPhone;
        userData!.address = currentAddress;
        userData!.gender = currentGender === "male";


        try {
            request.put<UserData>(CURRENT_USER, userData)
                .then(r => {
                    history.go(0);
                    }
                );
        } catch (error){
            console.log(error);
        }

    }



    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const handleOpen = () => {
      setOpen(true);
  }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSave = () => {



        if (newPassword !== confirmNewPassword) {
            alert('New Passwords do not match!');
            return;
        }

        if (newPassword.length < 8){
            alert('NewPassword must be longer than or equal to 8')
            return;
        }


        try {

            String(newPassword)
            String(oldPassword)

            const req = {
                newPassword,
                oldPassword
            }



            request.put<UserData>(CHANGE_PASSWORD, req)
                .then(r => {
                        history.go(0);
                    }
                );

        } catch (error){
            console.log(error);
        }


        handleClose();
    };


    const handleButtonClick = () => {
        history.push('/');
    };




  const updateAvatar = () => {
      history.push(ProfilePath.UpdateAvatar)
  }

  // @ts-ignore
    return (
      <>
          <CssBaseline />
          <Container sx={{
              marginTop: '10px',
              width:"1500"
          }}
              >
              <Box sx={{

                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:"center",
              }}>


                  <Paper sx={{
                      width:'100%'
                  }} elevation={5}>
                          <Grid sx={{
                              marginLeft: '3%',
                              marginTop: '3%'
                          }}>
                              <Typography component="h1" variant="h5">Basic info</Typography>
                          </Grid>

                          <Grid container spacing={10}
                                alignItems="center"
                          >
                              <Grid
                                  item xs={2}
                                  sx={{
                                      align:"left",
                                      marginLeft: '3%'
                              }} >
                                  <Typography>Display Name </Typography>
                              </Grid>

                              <Grid item xs={2}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="displayName"
                                      defaultValue={userData!.displayName}
                                      onChange={handleDisplayNameChange}
                                      // autoFocus
                                  />
                              </Grid>


                          </Grid>
                          <Divider />
                          <Grid container spacing={10}
                                alignItems="center"
                          >

                              <Grid  item xs={2}
                                     sx={{
                                         align:"left",
                                         marginLeft: '3%'
                                     }} >
                                  {/*//TODO*/}
                                  <Typography>First Name </Typography>
                              </Grid>
                              <Grid item xs={2}
                                    sx={{
                                        align:"center"
                                    }}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="firstName"
                                      defaultValue={userData!.firstName}
                                      onChange={handleFirstNameChange}
                                  />
                              </Grid>

                              <Grid  item xs={2}
                                     sx={{
                                         // align:"left",
                                         marginLeft: '5%'
                                     }}
                              >
                                  {/*//TODO*/}
                                  <Typography>Last Name </Typography>
                              </Grid>

                              <Grid item xs={2}
                                    // sx={{
                                        // align:"center"
                              >
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  // fullWidth
                                  id="lastName"
                                  defaultValue={userData!.lastName}
                                  onChange={handleLastNameChange}
                              />

                          </Grid>


                          </Grid>
                          <Divider />
                          <Grid container spacing={10} alignItems="center">
                              <Grid item xs={2}
                                    sx={{
                                        align:"left",
                                        marginLeft: '3%'
                                    }}>
                                  {/*//TODO*/}
                                  <Typography>Gender </Typography>
                              </Grid>
                              <Grid  item xs={2}
                                     sx={{
                                         align:"center",
                                         marginBottom:'0.8%',
                                         marginTop: '1.5%'
                                     }}>


                                  <FormControl
                                        sx={{
                                            width:'100%'
                                        }}
                                  >
                                      <Select value={currentGender} onChange={handleGenderChange}>
                                          <MenuItem value="male">Male</MenuItem>
                                          <MenuItem value="female">Female</MenuItem>
                                      </Select>

                                  </FormControl>
                              </Grid>


       </Grid>


                      <Grid sx={{
                          marginLeft: '3%',
                      }}>
                          <Typography component="h1" variant="h5">Contact info</Typography>
                      </Grid>

                      <Grid container spacing={-20}
                            alignItems="center"
                      >
                          <Grid
                              item xs={3}
                              sx={{
                                  align:"left",
                                  marginLeft: '3%'
                              }} >
                              {/*//TODO*/}
                              <Typography>Address </Typography>
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
                                  id="address"
                                  defaultValue={userData!.address}
                                  onChange={handleAddressChange}
                              />
                          </Grid>

                          {/*<Button*/}
                          {/*    sx={{*/}
                          {/*        marginLeft: '5%'*/}
                          {/*    }} disableElevation*/}
                          {/*    variant="contained"*/}
                          {/*    aria-label="Disabled elevation buttons">Update</Button>*/}

                      </Grid>
                      <Divider />
                      <Grid container spacing={-20}
                            alignItems="center">

                          <Grid  item xs={3}
                                 sx={{
                                     align:"left",
                                     marginLeft: '3%'
                                 }} >
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
                                  defaultValue={userData!.phone}
                                  onChange={handlePhoneChange}
                              />
                          </Grid>



                      </Grid>

                      <Grid container spacing={-20}
                            alignItems="center"
                            marginBottom='1%'
                            justifyContent="flex-end"
                      >
                          <Button sx={{
                              marginLeft: '5%',
                          }} disableElevation
                                  variant="contained"
                                  aria-label="Disabled elevation buttons"
                             onClick={updateInfo}

                          >Update</Button>


                          <Button sx={{
                              marginLeft: '5%',
                          }} disableElevation
                                  variant="contained"
                                  aria-label="Disabled elevation buttons"
                            onClick={cancelUpdate}
                          >Cancel</Button>

                      </Grid>
                  </Paper>

                  <Paper sx={{width:'100%', marginTop:'3%'}} elevation={5}>
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
                              onClick={handleOpen}
                          >Reset
                          </Button>

                          <Dialog open={open} onClose={handleClose}

                                  TransitionComponent={Fade}
                                  // disablePortal={true}
                          >
                              <DialogTitle>  Update Password</DialogTitle>
                              <DialogContent>
                                  <TextField
                                      label="Current Password"
                                      type="password"
                                      value={oldPassword}
                                      onChange={handleOldPasswordChange}
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="New Password"
                                      type="password"
                                      value={newPassword}
                                      onChange={handleNewPasswordChange}
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Confirm New Password"
                                      type="password"
                                      value={confirmNewPassword}
                                      onChange={handleConfirmNewPasswordChange}
                                      fullWidth
                                      margin="normal"
                                  />

                              </DialogContent>
                              <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                      Cancel
                                  </Button>
                                  <Button onClick={handleSave} color="primary">
                                      Save
                                  </Button>
                              </DialogActions>
                          </Dialog>
                      </Grid>

                  </Paper>


                  <Button variant="contained" color="primary"
                          sx={{marginTop:'1%',
                              marginRight: '-85%',
                              marginBottom: '1%'
                          }}
                          onClick={handleButtonClick}>
                      Back to home
                  </Button>

              </Box>

          </Container>
      </>
  );
};
