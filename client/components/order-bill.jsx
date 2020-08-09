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
import { withStyles } from '@material-ui/core/styles';
import ReceiptNumber from './receipt-number';

const useStyles = theme => ({
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
});

const rows = [];

function createRow(name, qty, price, id) {
  const priceRow = (qty * price).toFixed(2);
  return { name, qty, priceRow, id };
}

function updateRow(orders) {
  rows.splice(0, rows.length);

  for (const item in orders) {
    const itemId = parseFloat(orders[item].itemId);
    const price = parseFloat(orders[item].salePrice);
    const qty = parseInt(orders[item].quantity);
    const rowValue = createRow(`${orders[item].item}`, qty, price, itemId);
    rows.push(rowValue);
  }
}

class OrderBill extends React.Component {
  constructor(props) {
    super(props);
    this.table = this.props.table;
    this.state = { ordered: false };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handlePay = this.handlePay.bind(this);
  }

  handleCancel() {
    this.props.cancelOrder();
  }

  handleOrder() {
    const orders = this.props.orderItem;
    const orderItems = { tableId: 0, items: [] };

    orderItems.tableId = this.table;
    for (const property in orders) {
      const item = [orders[property].itemId, orders[property].quantity];
      orderItems.items.push(item);
    }

    if (!orderItems.items.length) return;

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderItems)
    }).then(response => {
      if (response.status === 201) {
        this.setState({ ordered: !this.state.ordered });
      }
    }).catch(error => console.error(error.message));
  }

  handlePay() {
    alert('to be updated');
    this.setState({ ordered: !this.state.ordered });
    this.handleCancel();
  }

  static getDerivedStateFromProps(props, state) {
    updateRow(props.orderItem);
    return true;
  }

  render() {
    const { classes } = this.props;
    const payBtn = !this.state.ordered;
    const orderBtn = this.state.ordered;
    const orderBtnCompoent = (
      <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOrder} disabled={orderBtn}>
              Order
      </Button>
    );

    return (
      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Table {this.table}
            </Typography>
          </Grid>
          <ReceiptNumber {...this.props} />
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
                <TableRow key={row.name} id={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="right">${row.priceRow}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
            <Button variant="contained" className={classes.button} onClick={this.handleCancel}>
              Cancel
            </Button>
            {this.props.check ? <></> : orderBtnCompoent}
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handlePay} disabled={payBtn}>
              Pay
            </Button>
          </Box>
        </TableContainer>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(OrderBill);
