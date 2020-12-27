import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import UpiForm from './UpiForm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₹"
    />
  );
}

function PayForm(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    amount: '',
    sender: props.loggedInUser.username,
    receiver: props.user.username,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    handleClickOpen();
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        value={values.amount}
        onChange={handleChange}
        name="amount"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br/>
      <Button color="primary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleSubmit}>
        PAY
      </Button>
      <UpiForm open={open} handleClose={handleClose} handleClose1={props.handleClose} details={values}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps)(PayForm);