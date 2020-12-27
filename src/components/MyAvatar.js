import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import {Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import {fetchRequests} from '../redux/index';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: "70%",
    },
  },
}));

function MyAvatar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    props.fetchRequests();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
      <Badge color="secondary" overlap="circle" badgeContent={props.requests.length}>
        <Avatar alt={props.userDetails.username} src={props.userDetails.profileImage} />
      </Badge>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {props.requests.map((request) => {
          return (
            <MenuItem key={request.id} onClick={handleClose}>{request.recipient} requested {request.amount} Rupees</MenuItem>
          );})}
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      userDetails: state.loggedInUser,
      requests: state.requests,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequests: () => dispatch(fetchRequests()),
  };
};
  
export default connect(mapStateToProps,mapDispatchToProps)(MyAvatar);