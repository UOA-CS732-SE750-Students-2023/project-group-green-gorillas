import * as React from 'react';

import Button from '@mui/material/Button';

import {
  Typography,
  Paper, CssBaseline,
  Container,
  Box, Grid, TextField
} from "@mui/material";
import {useCurrentUser} from "../../../../../hooks/useCurrentUser";
import {useState} from "react";
import {parseDate} from "../../../../../utils/parseDate";
import {request} from "../../../../../api/request";
import {UPDATE_COMPANY_NAME} from "../../../../../api/api";

interface OrganisationData {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    active: string;
}

export default function AskConfirmationBeforeSave() {
    const {user} = useCurrentUser();

    const [orgData, setOrgData] = useState<OrganisationData | null>({
        name: user!.organisation!.name,
        id: user!.organisation!.id,
        createdAt: parseDate(user!.organisation!.createdAt),
        updatedAt: parseDate(user!.organisation!.updatedAt),
        active: user!.organisation!.active ? "True" : "False"
    });

    const[companyName, setCompanyName] = useState<string>(user!.organisation!.name);
    const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    }

    const handleUpdateCompanyName = () => {

        const req = {
            "name":companyName
        }

        try {
            request.patch<JSON>(UPDATE_COMPANY_NAME, req)
                .then(r => {
                        history.go(0);
                    }
                );
        } catch (error){
            console.log(error);
        }
    }







  return (
    <div style={{ height: 400, width: '100%' }}>


      <CssBaseline />

      <Container sx={{
        marginTop:'-2%',
        marginLeft: '1%'
      }}
      >
        <Box sx={{

          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
        }}>

          <Paper sx={{
            width:'128%',
            marginLeft:'28%',
            marginTop:'4%',
              display: 'flex',
              flexWrap: 'wrap',
          }} elevation={5}>



            <Grid sx={{
              marginLeft: '3%',
              marginTop: '3%'
            }}>
              <Typography component="h1" variant="h5">Company Info</Typography>
            </Grid>


            <Grid container
                  alignItems="center">
              <Grid item xs={6} sm={4} md={3}
                  sx={{
                    align:"left",
                    width:"10%",
                    marginLeft: '3%'
                  }} >
                <Typography>Company Name</Typography>
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    defaultValue={orgData!.name}
                    onChange={handleCompanyNameChange}
                />
              </Grid>

                <Grid item xs={6} sm={4} md={3}>
                    <Button
                        sx={{
                            marginLeft: '5%'
                        }} disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        onClick={handleUpdateCompanyName}
                    >Update</Button>
                </Grid>

            </Grid>



            <Grid container alignItems="center" sx={{height:'100px'}}>

              <Grid  item xs={6} sm={4} md={3}
                     sx={{
                         align:"left",
                         width:"10%",
                         marginLeft: '3%',

                     }} >
                <Typography>Create Time</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={3}
                    sx={{
                      align:"center"
                    }}>
                <Typography>{orgData?.createdAt}</Typography>
              </Grid>
            </Grid>


              <Grid container alignItems="center" sx={{height:'100px'}}>

                  <Grid  item xs={6} sm={4} md={3}
                         sx={{
                             align:"left",
                             marginLeft: '3%'
                         }} >
                      <Typography>Update Time</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}
                        sx={{
                            align:"center"
                        }}>
                      <Typography>{orgData?.updatedAt}</Typography>
                  </Grid>
              </Grid>


              <Grid container  alignItems="center" sx={{height:'100px'}}>

                  <Grid  item xs={6} sm={4} md={3}
                         sx={{
                             align:"left",
                             marginLeft: '3%'
                         }} >
                      <Typography>Active State</Typography>
                  </Grid>
                  <Grid item xs={2}
                        sx={{
                            align:"center"
                        }}>
                      <Typography>{String(orgData?.active)}</Typography>
                  </Grid>
              </Grid>
          </Paper>
        </Box>
      </Container>

    </div>
  );
}

