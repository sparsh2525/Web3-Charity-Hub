import React,{Fragment,useEffect,useState} from 'react';
import { AppBar,Button,Fab,IconButton,Card,CardActions,CardContent,CardMedia,CssBaseline,Grid,Toolbar,Typography,Container,Snackbar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import  {Link, useAsyncError} from  'react-router-dom';
import {Auth ,db} from '../firebase/firebase';
import { collection,getDocs,deleteDoc } from 'firebase/firestore';
import Donate from '../Donate/Donate';
interface Donation {
  id:number,
  title:string,
  description:string,
  amount:number,
  donatedAmount:number
}



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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom:'10%',
    right:'5%',
  }
}));


export default function Home() {
  const [donations,setDonations] = useState<Array<Donation>>([]);
  const {classes} = useStyles();
  const [selectedDonation,setSelectedDonation] = useState<Donation>();
  const user = Auth.currentUser;
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [totalDonation, setTotalDonation] = React.useState(0);
  const [snackMsg, setSnackMsg] = React.useState('');
  const [snackMsgOpen, setSnackMsgOpen] = React.useState(false);

  useEffect(()=>{
    getDocs(collection(db,'donations')).then(
      (snap)=>{
        // snap.forEach((doc)=> {
        //   deleteDoc(doc.ref)
        // });
        const data = snap.docs.map(doc => doc.data());
        setDonations(data as Donation[])
        
      }
    )

    getDocs(collection(db,'totalDonation')).then(
      (snap)=>{
        // snap.forEach((doc)=> {
        //   deleteDoc(doc.ref)
        // });
        const data = snap.docs.map(doc => doc.data());
        setTotalDonation(Number(data[0].total))
        
      }
    )
  },[open,snackMsg,snackMsgOpen,snackOpen])
  

  const handleClickOpen = (donation:Donation) => {
    if(user){
      setSnackOpen(false);
      setOpen(true);
      console.log(donations)
      setSelectedDonation(donation);
    }
    
    else
    setSnackOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getDocs(collection(db,'donations')).then(
      (snap)=>{
        // snap.forEach((doc)=> {
        //   deleteDoc(doc.ref)
        // });
        const data = snap.docs.map(doc => doc.data());
        setDonations(data as Donation[])
        
      }
    )

    getDocs(collection(db,'totalDonation')).then(
      (snap)=>{
        // snap.forEach((doc)=> {
        //   deleteDoc(doc.ref)
        // });
        const data = snap.docs.map(doc => doc.data());
        setTotalDonation(Number(data[0].total))
        
      }
    )
  };

  const action = (
    <Link to= '/login'>
    <Button color="secondary" size="small">
      Sign In
    </Button>
    </Link>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
      <MenuIcon   />
      
    </IconButton>
    <Typography variant="h6" className={classes.title} >
      Web3 Charity Hub
    </Typography>
    {
      user?<Link to="/login" style={{textDecoration:'none'}}>
      <Button variant="contained" disableElevation onClick={()=>{Auth.signOut()}}>Logout</Button>
      </Link>:<Link to="/login" style={{textDecoration:'none'}}>
    <Button variant="contained" disableElevation>Login</Button>
    </Link>
    }
  </Toolbar>
</AppBar>
      <main>
      
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Web3 Charity Hub by PerpleX 
            </Typography>
            {user?<><Typography variant="h5" align="center" color="textSecondary" paragraph>
              Small actions from a lot of people make big changes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Total Donations so far: {totalDonation}
            </Typography></>
            :
            <Fragment>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Get Donations for your NGO , organization or for anyone who is in need , Sign up - Add a donation add details upload documents get noticed by hundreds of people
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent={'center'}>
                <Grid item>
                 <Link to="/login" style={{textDecoration:'none'}}>
                 <Button variant="contained" color="primary">
                    Get Donation
                  </Button>
                 </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" style={{textDecoration:'none'}}>
                  <Button variant="outlined" color="primary">
                    Sign up
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
            </Fragment> }
            {
              user?
              <Link to="/add">
              <Fab color="secondary" variant="extended" className={classes.fab}>
              <AddIcon className={classes.extendedIcon} />
              Add new
            </Fab>
            </Link>:<React.Fragment></React.Fragment>
            }
            {open ? 
                   <Donate setOpen={setOpen} open={open} handleClose={handleClose} selectedDonation={selectedDonation} setSnackMsg={setSnackMsg} setSnackMsgOpen={setSnackMsgOpen}/>
                   :
                   <Snackbar
                   open={snackOpen}
                   autoHideDuration={6000}
                   onClose={()=>setSnackOpen(false)}
                   message={"No user logged in, please sign in."}
                   action={action}
                 />
                 }

{snackMsg!=='' &&
                   <Snackbar
                   open={snackMsgOpen}
                   autoHideDuration={6000}
                   onClose={()=>setSnackMsgOpen(false)}
                   message={snackMsg}
                 />
                 }
          </Container>
          
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {donations.map((donation) => (
              <Grid item key={donation.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    title="Make a Change"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {donation.title}
                    </Typography>
                    <Typography>
                      {donation.description}
                    </Typography>
                    {donation.amount>(donation.donatedAmount ? donation.donatedAmount : 0) &&
                    <Typography>
                      Required Amount: {donation.amount}
                    </Typography>
                    }
                    {donation.amount<=donation.donatedAmount &&
                    <Typography>
                      Donation Goal Reached!
                    </Typography>
                    }
                    {donation.donatedAmount && donation.donatedAmount !==0 && 
                    <Typography>
                      Donated Amount: {donation.donatedAmount}
                    </Typography>}
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="primary">
                      View
                    </Button> */}
                 
                    <Button size="small" color="primary" onClick={()=>handleClickOpen(donation)} disabled={donation.amount<=donation.donatedAmount}>
                      Donate
                    </Button>
                   
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Created by
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Sparsh Gupta and Vanshika Pandey
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

