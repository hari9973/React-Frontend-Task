import React from 'react';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {makeMoneyRequest} from '../redux/index';

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
  const [values, setValues] = React.useState({
    amount: '',
    payer: props.user.username,
    recipient: props.loggedInUser.username,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
      props.makeMoneyRequest(values);
      props.handleClose();
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
        Request
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        makeMoneyRequest :  (data) => dispatch(makeMoneyRequest(data)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PayForm);