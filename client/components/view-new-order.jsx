import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuList from './menu-list';
import OrderBill from './order-bill';

export default class ViewNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableId: 5,
      orders: {}
    };
    this.clearOrderItems = this.clearOrderItems.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  clearOrderItems() {
    this.setState({ orders: {} });
  }

  addItemToOrder(item) {
    if (this.state.orders[item.itemId]) {
      const newObj = { ...this.state.orders };
      newObj[item.itemId].quantity = this.state.orders[item.itemId].quantity + 1;
      this.setState({ orders: newObj });
    } else {
      const addItem = {};
      addItem[item.itemId] = item;
      addItem[item.itemId].quantity = 1;
      const obj = { ...this.state.orders, ...addItem };
      this.setState({ orders: obj });
    }
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <MenuList addToOrder={this.addItemToOrder} />
        </Grid>
        <Grid item xs={5}>
          {/* <OrderBill table={this.state.tableId} check receipt="123" orderItem={this.state.orders} cancelOrder={this.clearOrderItems}/> */}
          <OrderBill table={this.state.tableId} orderItem={this.state.orders} cancelOrder={this.clearOrderItems}/>
        </Grid>
      </Grid>
    );
  }
}
