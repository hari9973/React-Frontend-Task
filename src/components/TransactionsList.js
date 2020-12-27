import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import "./DashBoard.css"

const columns = [
  { id: 'id', label: 'Transaction Id', minWidth: 70 },
  { id: 'sender', label: 'Sender', minWidth: 70 },
  {
    id: 'receiver',
    label: 'Receiver',
    minWidth: 70,
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdOn',
    label: 'Transaction Time',
    minWidth: 70,
    align: 'right'
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableRowReceived: {
      backgroundColor: green[200],
  },
  tableRowSent: {
    backgroundColor: red[200],
},
});

function TransactionsList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow className={row.sender === props.loggedInUser.username ? classes.tableRowSent : classes.tableRowReceived} role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps)(TransactionsList);