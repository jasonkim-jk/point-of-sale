import React from 'react';
import { Paper, Grid, Divider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import OrderBillTotal from './OrderBillTotal';

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
  },
  icon: {
    margin: theme.spacing(0.5)
  },
  qty: {
    padding: theme.spacing(0)
  },
  popupTitle: {
    margin: theme.spacing(2, 0, 0)
  },
  popupBtn: {
    minWidth: 100,
    minHeight: 40,
    padding: theme.spacing(1),
    margin: theme.spacing(0, 3, 3, 0)
  }
});

const rows = [];

function createRow(name, qty, price, id) {
  const priceRow = (qty * price).toFixed(2);
  return { id, name, qty, priceRow };
}

function updateRow(orders, taxRate, prevOrder) {
  let subTotal = 0;
  rows.splice(0, rows.length);

  if (prevOrder) {
    for (const [index, element] of orders.items.entries()) {
      const item = element.item;
      const price = parseFloat(element.salePrice);
      const qty = parseInt(element.quantity);
      const rowValue = createRow(item, qty, price, index);
      subTotal += parseFloat(rowValue.priceRow);
      rows.push(rowValue);
    }
  } else {
    for (const item in orders) {
      const itemId = parseFloat(orders[item].itemId);
      const price = parseFloat(orders[item].salePrice);
      const qty = parseInt(orders[item].quantity);
      const rowValue = createRow(`${orders[item].item}`, qty, price, itemId);
      subTotal += parseFloat(rowValue.priceRow);
      rows.push(rowValue);
    }
  }

  const tax = subTotal * parseFloat(taxRate) / 100;
  const total = subTotal + tax;
  return { total, subTotal, tax };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class OrderBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ordered: false, payFeature: false, popup: false };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handlePay = this.handlePay.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  handleCancel() {
    this.props.cancelOrder();
  }

  handleOrder() {
    const orders = this.props.orderItem;
    const orderItems = { tableId: 0, items: [] };

    orderItems.tableId = this.props.table;
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
        if (this.state.payFeature) {
          this.setState({ ordered: !this.state.ordered });
        } else {
          this.setState({ popup: true });
        }
      }
    }).catch(error => console.error(error.message));
  }

  handlePay() {
    alert('to be updated');
    this.setState({ ordered: !this.state.ordered });
    this.handleCancel();
  }

  handleIncrease(event) {
    this.props.updateItem(event.currentTarget.parentElement.id, 1);
  }

  handleDecrease(event) {
    this.props.updateItem(event.currentTarget.parentElement.id, -1);
  }

  closePopup() {
    this.setState({ popup: false });
    this.handleCancel();
  }

  static getDerivedStateFromProps(props, state) {
    let price = {};
    if (props.prevOrder) {
      price = updateRow(props.orderedItems, props.taxRate, props.prevOrder);
    } else {
      price = updateRow(props.orderItem, props.taxRate, props.prevOrder);
    }
    return {
      total: price.total.toFixed(2),
      subTotal: price.subTotal.toFixed(2),
      tax: price.tax.toFixed(2)
    };
  }

  render() {
    const { classes } = this.props;
    const payBtn = !this.state.ordered;
    const orderBtn = this.state.ordered;
    const plusBtnComponent = (
      <IconButton onClick={this.handleIncrease}>
        <AddIcon className={classes.icon} fontSize="small" color="primary" />
      </IconButton>
    );
    const minusBtnComponent = (
      <IconButton onClick={this.handleDecrease}>
        <RemoveIcon className={classes.icon} fontSize="small" color="secondary" />
      </IconButton>
    );
    const orderBtnComponent = (
      <>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleOrder}
          disabled={orderBtn}
        >
          Order
        </Button>
        <Dialog open={this.state.popup} TransitionComponent={Transition} keepMounted onClose={this.closePopup}>
          <DialogTitle className={classes.popupTitle}>New Order</DialogTitle>
          <DialogContent>
            <DialogContentText>Your order has been successfully processed.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.closePopup}
              color="primary"
              variant="contained"
              size="large"
              className={classes.popupBtn}
            >
              OKAY
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
    const payBtnComponent = (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.handlePay}
        disabled={payBtn}
      >
        Pay
      </Button>
    );

    return (
      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Table {this.props.table}
            </Typography>
          </Grid>
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
                  <TableCell align="center" id={row.id} className={classes.qty}>
                    <Typography noWrap id={row.id}>
                      {this.props.check || this.props.prevOrder ? <></> : minusBtnComponent}
                      {row.qty}
                      {this.props.check || this.props.prevOrder ? <></> : plusBtnComponent}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">${row.priceRow}</TableCell>
                </TableRow>
              ))}
              <OrderBillTotal price={this.state} />
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="center" m={1} mt={3} p={1} bgcolor="background.paper">
            <Button variant="contained" className={classes.button} onClick={this.handleCancel}>
              {this.props.prevOrder ? 'Back' : 'Cancel'}
            </Button>
            {this.props.check || this.props.prevOrder ? <></> : orderBtnComponent}
            {this.state.payFeature ? payBtnComponent : <></>}
          </Box>
        </TableContainer>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(OrderBill);
