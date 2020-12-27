import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import {CallMade,CallReceived} from '@material-ui/icons';
import MyDialog from './MyDialog';
import PayForm from './PayForm';
import { connect } from "react-redux";
import RequestForm from "./RequestForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
  },
  inline: {
    display: 'inline',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function UserList(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [open1, setOpen1] = React.useState(false);

  const [recipient, setRecipient] = React.useState({});

  const [payer, setPayer] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handlePay = (user) => {
    setRecipient(user);
    handleClickOpen();
    
  }

  const handleRequest = (user) => {
    setPayer(user);
    handleClickOpen1();
  }

  return (
    <React.Fragment>
    <List className={classes.root}>
    {props.users.map((user) => {
        return (
            <React.Fragment key={user.id}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user.username} src={user.profile.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.username}
                    secondary={
                        <React.Fragment>
                            <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            className={classes.margin}
                            onClick={() => {handlePay(user);}}
                            >
                                <CallMade className={classes.extendedIcon} />
                                PAY
                            </Fab>
                            <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            className={classes.margin}
                            onClick={() => {handleRequest(user);}}
                            >
                                <CallReceived className={classes.extendedIcon} />
                                REQUEST
                            </Fab>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </React.Fragment>
        );})}
    </List>
    <MyDialog open={open} handleClose={handleClose} title="Pay" username={recipient.username}>
          <PayForm user={recipient} handleClose={handleClose}/>
    </MyDialog>
    <MyDialog open={open1} handleClose={handleClose1} title="Request" username={payer.username}>
          <RequestForm user={payer} handleClose={handleClose1}/>
    </MyDialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
      users: state.users,
      loggedInUser: state.loggedInUser,
    };
  };
  
  export default connect(mapStateToProps)(UserList);