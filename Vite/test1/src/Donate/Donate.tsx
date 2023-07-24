import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar } from '@mui/material'
import { donate, getTotalDonations, getDonationCount } from '../Web3func/Web3utils';
import { updateDoc,doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

interface Donation {
  id: number,
  title: string,
  description: string
}

export default function Donate(props: any) {

  const [donationAmt, setDonationAmt] = React.useState<number>();
  const [snackOpen, setSnackOpen] = React.useState(false);
  
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log(props.selectedDonation, donationAmt)
  }, [])

  async function donateClicked() {
    if (donationAmt !== undefined && donationAmt > 0) {
      console.log(donationAmt);
      props.handleClose();
      const donationData= await donate(props.selectedDonation.title, Number(donationAmt));
      console.log(donationData.blockHash)
      props.setSnackMsg('Block Hash: '+donationData.blockHash)
      props.setSnackMsgOpen(true);
      fetchDonationDetails();
      
    }
    else {
      setSnackOpen(true)
    }

  }
  const fetchDonationDetails = async () => {
    const total = await getTotalDonations(props.selectedDonation.title);
    console.log(total)
    console.log({...props.selectedDonation, donatedAmount:total})
    await updateDoc(doc(db, "donations", props.selectedDonation.title), {...props.selectedDonation, donatedAmount:total})
  .then(() => {
    console.log("Document successfully updated.");
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
    //setTotalDonations(total);

    const count = await getDonationCount();

    await updateDoc(doc(db, "totalDonation", 'total'), {total:count})
  .then(() => {
    console.log("Document successfully updated.");
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
    //setDonationCount(count);
    console.log(count)
    navigate('/');
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Donate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter donation amount for {(props.selectedDonation as Donation).title}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="donationAmt"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setDonationAmt((e.target.value as unknown) as number)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={donateClicked}>Donate</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        message={'Invalid amount entered.'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}