import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuList from './menu-list';
import OrderBill from './order-bill';

export default class ViewNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableId: 0,
      orders: {},
      taxRate: 7.5
    };
    this.clearOrderItems = this.clearOrderItems.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.updateItemQty = this.updateItemQty.bind(this);
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

  componentDidMount() {
    this.setTableId(this.props.match.params.tableId);
  }

  setTableId(id) {
    this.setState({ tableId: id });
  }

  updateItemQty(itemId, qty) {
    const orders = this.state.orders;

    for (const item in orders) {
      if (parseInt(itemId) === orders[item].itemId) {
        if (qty === 1) {
          this.addItemToOrder(orders[item]);
        } else {
          const newObj = { ...this.state.orders };
          newObj[item].quantity = this.state.orders[item].quantity - 1;

          if (newObj[item].quantity <= 0) {
            delete newObj[item];
          }
          this.setState({ orders: newObj });
        }
        break;
      }
    }
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <MenuList addToOrder={this.addItemToOrder} />
        </Grid>
        <Grid item xs={5}>
          <OrderBill
            table={this.state.tableId}
            orderItem={this.state.orders}
            cancelOrder={this.clearOrderItems}
            updateItem={this.updateItemQty}
            taxRate={this.state.taxRate}
          />
        </Grid>
      </Grid>
    );
  }
}
