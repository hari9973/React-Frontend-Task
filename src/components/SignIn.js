import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import {fetchJwt,setMessageLock,setErrorLock} from '../redux/index';
import { withSnackbar } from 'notistack';



const useStyles = makeStyles((theme) => ({
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const credentials = {
  username: "guest",
  password: "guest"
}

function SignIn(props) {

  React.useEffect(() => {
    if(props.error_lock){
      props.enqueueSnackbar(props.error,{variant:'error'});
      props.setErrorLock(0);
  }
  if(props.message_lock){
    props.enqueueSnackbar(props.message,{variant:'success'});
    props.setMessageLock(0);
  }
  });

  const classes = useStyles();

  const [data, setData] = React.useState(credentials);

  const handleUsername = (e) => {
    setData({...data,username:e.target.value});
  };

  const handlePassword = (e) => {
    setData({...data,password:e.target.value});
  };

  const ValidateUser = (e) => {
    props.fetchJwt(data);
    e.preventDefault();
  }

  return (
    props.Authorized === "false" ? ( 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={ValidateUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            value={data.username}
            onChange={handleUsername}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={data.password}
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
                <ul>
                    <li>     
                        <Box color={red[500]} component="span" m={1}>
                            username and password = guest
                        </Box>
                    </li>
                    <li>     
                        <Box color={red[500]} component="span" m={1}>
                            Or can use any of the username from given api<br/>
                            eg:- User1,User2,Richard Hansons etc..,<br/>
                            (for all above users username=password)
                        </Box>
                    </li>
                </ul>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>):(<Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />)
  );
}

const mapStateToProps = (state) => {
  return {
    Authorized: state.isAuthenticated,
    error: state.error,
    message: state.message,
    message_lock: state.message_lock,
    error_lock: state.error_lock,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJwt: (data) => dispatch(fetchJwt(data)),
    setMessageLock: (data) => dispatch(setMessageLock(data)),
    setErrorLock: (data) => dispatch(setErrorLock(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SignIn));