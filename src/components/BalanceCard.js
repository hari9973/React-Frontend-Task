import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    backgroundColor: blue[100],
    marginLeft: "40%",
    marginRight: "40%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function BalanceCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Balance of {props.userDetails.username}
        </Typography>
        <Typography variant="h4" component="h4">
         &#x20b9; {props.userDetails.balance}
        </Typography>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
    return {
      userDetails: state.loggedInUser,
    };
};

export default connect(mapStateToProps)(BalanceCard);