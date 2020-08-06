import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ReceiptNumber from './receipt-number';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1)
  },
  table: {
    minWidth: 300
  },
  button: {
    minWidth: 100,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 2)
  }
}));

function createRow(name, qty, price) {
  const priceRow = qty * price;
  return { name, qty, priceRow };
}

const rows = [
  createRow('Beef Bulgogi', 3, 11.79),
  createRow('Hawaiian Steak', 2, 15.27),
  createRow('Samgyubsal', 2, 9.56)
];

export default function OrderBill(props) {
  const { table, ...others } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            Table {table}
          </Typography>
        </Grid>
        <ReceiptNumber {...others} />
      </Grid>
      <Divider />
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Quantity</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Price</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.qty}</TableCell>
                <TableCell align="right">{row.priceRow}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
          <Button variant="contained" className={classes.button}>Cancel</Button>
          <Button variant="contained" color="primary" className={classes.button}>Order</Button>
          <Button variant="contained" color="primary" className={classes.button}>Pay</Button>
        </Box>
      </TableContainer>
    </Paper>
  );
}
