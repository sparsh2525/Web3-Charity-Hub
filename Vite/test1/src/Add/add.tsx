import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField,Grid,Box,Typography,Container } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { Link} from 'react-router-dom';
import { Auth, db } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { doc,addDoc,setDoc } from 'firebase/firestore';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
      Web3 Charity Hub by PerpleX @ web3conf hackathon 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Add() {
  const {classes} = useStyles();
  const user = Auth.currentUser;
  const [details, setDetails] = useState({ title: '', description: '',amount:0});
  const navigate = useNavigate()

  const addDonation = async() => {
    const data = {
      ...details,
      uid: user!.uid
    }
    console.log(data)
    
  try {
    const docRef = await setDoc(doc(db, "donations", details.title), {
      ...data
    }).then((x) => {
      console.log("done", x);
      navigate('/')
    }).then;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
    // db.(' ').add(data).then((x) => {
    //   console.log("done", x.id);
    //   navigate('/')
    // }).catch((err) => { alert(err) }) 
  }
  const handleChange = (e:any) => {
    let name  = e.target.name;
    let val = e.target.value;
    e.preventDefault();
    if(name==='amount')
    setDetails({ ...details, [name]: Number(val) });
    else
    setDetails({ ...details, [name]: val });
    console.log(details)
  }
  const handleSubmit = (e:any) => {

    e.preventDefault();
    addDonation();

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Favorite />
        </Avatar>
        <Typography component="h1" variant="h5">
          Request a Donation
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Add title for your donation"
            name="title"
            autoFocus
            onChange={e=>handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="description"
            type="test"
            id="description"
            onChange={e=>handleChange(e)}

          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="amount"
            type="number"
            id="amount"
            onChange={e=>handleChange(e)}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Request
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">
                <Button color="primary" variant="contained">
                  Go back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}