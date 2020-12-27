import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import TransactionsList from './TransactionsList';
import BalanceCard from './BalanceCard';
import UserList from './UsersList';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import MyAvatar from './MyAvatar';
import './DashBoard.css'
import {Button} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import {fetchTransactions,fetchCurrentUser,fetchRequests,setErrorLock,setMessageLock} from '../redux/index';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

function DashBoard(props){

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

    const refresh = () =>{
      props.fetchTransactions();
      props.fetchCurrentUser();
      props.fetchRequests();
    }

    return (
      props.Authorized === "true" ? 
      (<Container className={classes.root} maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={10}
            sm={10}
            xl={10}
            xs={10}
          >
            <BalanceCard />
          </Grid>

          <Grid
            item
            lg={2}
            sm={2}
            xl={2}
            xs={2}
          >
            <MyAvatar />
          </Grid>
          
          <Grid
            item
            lg={9}
            md={12}
            xl={8}
            xs={12}
          >
            <div id="element1">
              <h4>Transactions</h4>
            </div>
            <div id="element2">
            <Button onClick={refresh}>refresh<RefreshIcon/></Button>
            </div>
            <TransactionsList />
          </Grid>
          <Grid
            item
            lg={3}
            md={12}
            xl={4}
            xs={12}
          >
            <h4>Users</h4>
            <UserList />
          </Grid>
        </Grid>
      </Container>) : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    );
}

const mapStateToProps = (state) => {
  return {
    Authorized: state.isAuthenticated,
    userDetails: state.loggedInUser,
    error: state.error,
    message: state.message,
    message_lock: state.message_lock,
    error_lock: state.error_lock,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchRequests: () => dispatch(fetchRequests()),
    setMessageLock: (data) => dispatch(setMessageLock(data)),
    setErrorLock: (data) => dispatch(setErrorLock(data)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(DashBoard));