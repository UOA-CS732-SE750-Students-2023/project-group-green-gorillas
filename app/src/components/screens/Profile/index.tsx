import React, { useState, useEffect } from "react";
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
    FormControl, InputLabel, MenuItem, Select
} from "@mui/material";
import axios from 'axios';
import { SelectChangeEvent } from "@mui/material/Select";


import {useHistory} from 'react-router-dom';
import {useCurrentUser} from "../../../hooks/useCurrentUser";


export enum ProfilePath {
    UpdateAvatar = "/main/profile_avatar"
}

interface userData {
    displayName: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    gender: boolean
}



export const ProfileScreen = () => {

    const {user} = useCurrentUser();

    const [userData, setUserData] = useState<userData | null>({
        displayName: user!.displayName,
        firstName: user!.firstName,
        lastName: 'Wang',
        phone:'123',
        address:'sss',
        gender: true
    });


    useEffect(() => {
        // setUserData(user)
    })

    // // Get user initial info
    const fetchData = () => {

        axios.put('https://jsonplaceholder.typicode.com/posts')
            .then(response => {

                }
            )
            .catch(error => {
                console.log(error);
            })
    }


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

    const[currentGender, setCurrentGender] = useState<boolean>(userData!.gender);
    const handleGenderChange = (event: SelectChangeEvent<boolean>) => {
        if (event.target.value == "male"){
            setCurrentGender(true)
        }{
            setCurrentGender(false)
        }
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
        userData!.gender = currentGender;

        setUserData(userData);


        console.log(userData);


        // axios.put('https://localhost:8080/api/user/current', userData)
        //     .then(response => {
        //
        //         }
        //     )
        //     .catch(error => {
        //         console.log(error);
        //     })

        history.go(0);
    }





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
              marginTop: '10px',
              width:"1500"
              // maxWidth:"100%"
          }}
              >
              <Box sx={{

                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:"center",
              }}>

                  {/*/!*updateAvatar*!/*/}
                  {/*<Avatar*/}
                  {/*    onMouseOver={handleMouseOver}*/}
                  {/*    onMouseOut={handleMouseOut}*/}
                  {/*    sx={{*/}
                  {/*        position: 'relative',*/}
                  {/*        width: 180, height: 180,*/}
                  {/*        zIndex: 1,*/}
                  {/*        backgroundColor: 'white',*/}
                  {/*        cursor: 'pointer'*/}
                  {/*      }}*/}
                  {/*    onClick={updateAvatar}*/}
                  {/*>*/}
                  {/*    <img*/}
                  {/*        src="../../public/defaultAvatar.svg"*/}
                  {/*        alt="overlay"*/}
                  {/*        style={{*/}
                  {/*            position: 'relative',*/}
                  {/*            width: '100%', height: '100%',*/}
                  {/*            zIndex: 1*/}
                  {/*        }}*/}
                  {/*    />*/}

                  {/*    {isHovering && (*/}
                  {/*        <img*/}
                  {/*            src="../../public/updateAvatar.svg"*/}
                  {/*            style={{*/}
                  {/*                position: 'absolute',*/}
                  {/*                marginTop: '63%',*/}
                  {/*                marginLeft: '2%',*/}
                  {/*                width: '30%',*/}
                  {/*                height: '30%',*/}
                  {/*                zIndex: 3*/}
                  {/*            }}*/}
                  {/*        />*/}
                  {/*    )}*/}
                  {/*</Avatar>*/}

                  {/*/!*TODO User要改*!/*/}
                  {/*<Typography marginTop={2} component="h1" variant="h3">*/}
                  {/*    Welcome, {userData!.displayName}*/}
                  {/*</Typography>*/}

                  <Paper sx={{
                      width:'100%'
                      // marginTop:'2%'
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
                                  {/*//TODO*/}
                                  <Typography>Display Name </Typography>
                              </Grid>

                              <Grid
                                  item xs={2}
                                  sx={{
                                  // align:"center"
                                  //     marginLeft: '7%'
                              }}>
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

                              {/*<Button*/}
                              {/*    sx={{*/}
                              {/*    marginLeft: '5%'*/}
                              {/*}} disableElevation*/}
                              {/*        variant="contained"*/}
                              {/*        aria-label="Disabled elevation buttons">Update</Button>*/}

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

                              {/*<Button sx={{*/}
                              {/*    marginLeft: '5%',*/}
                              {/*}} disableElevation*/}
                              {/*        variant="contained"*/}
                              {/*        aria-label="Disabled elevation buttons">Update</Button>*/}

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
                                  {/*<TextField*/}
                                  {/*    variant="outlined"*/}
                                  {/*    margin="normal"*/}
                                  {/*    required*/}
                                  {/*    fullWidth*/}
                                  {/*    id="gender"*/}
                                  {/*    name="gender"*/}
                                  {/*    autoComplete="gender"*/}
                                  {/*/>*/}

                                  <FormControl
                                        sx={{
                                            width:'100%'
                                        }}
                                  >
                                      <Select value={userData!.gender} onChange={handleGenderChange}>
                                          <MenuItem value={true}>Male</MenuItem>
                                          <MenuItem value={false}>Female</MenuItem>
                                      </Select>

                                  </FormControl>
                              </Grid>

                              {/*<Button sx={{*/}
                              {/*    marginLeft: '5%',*/}
                              {/*}} disableElevation*/}
                              {/*        variant="contained"*/}
                              {/*        aria-label="Disabled elevation buttons">Update</Button>*/}

                          </Grid>
                      {/*</Paper>*/}


                  {/*<Paper sx={{width:'100%', marginTop:'5%'}} elevation={5}>*/}
                      <Grid sx={{
                          marginLeft: '3%',
                          // marginTop: '3%'
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
