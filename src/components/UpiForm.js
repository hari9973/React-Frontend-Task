import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import {validateUpiAndMakeTransaction} from '../redux/index';

function PayForm(props) {

  const [upi, setUpi] = React.useState({
      username:props.loggedInUser.username,
      pin: '',
  });

  const handleUpi = (event) => {
    setUpi({...upi,pin:event.target.value});
  }


  const handleTransaction = () => {
    props.validateUpiAndMakeTransaction(upi,props.details);
    props.handleClose();
    props.handleClose1();
  }

  return (
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter UPI Pin</DialogTitle>
        <DialogContent>
      <TextField
        label="upi pin"
        value={upi.pin}
        onChange={handleUpi}
        name="upi"
        id="formatted-numberformat-input"
      />
      <br/>
      <Button color="primary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleTransaction}>
        Confirm
      </Button>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    };
  };

const mapDispatchToProps = (dispatch) => {
  return {
    validateUpiAndMakeTransaction :  (upi,data) => dispatch(validateUpiAndMakeTransaction(upi,data)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PayForm);