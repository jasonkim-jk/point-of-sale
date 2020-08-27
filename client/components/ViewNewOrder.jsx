import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuList from './MenuList';
import OrderBill from './OrderBill';

export default class ViewNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableId: 0,
      orders: {},
      orderedItems: [],
      prevOrder: false,
      taxRate: 7
    };
    this.clearOrderItems = this.clearOrderItems.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.updateItemQty = this.updateItemQty.bind(this);
  }

  clearOrderItems() {
    this.setState({ orders: {} });
    this.props.history.push('/');
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
    const tableId = this.props.match.params.tableId;
    this.getOrderedItems(tableId);
    this.setTableId(tableId);
  }

  setTableId(id) {
    this.setState({ tableId: id });
  }

  getOrderedItems(id) {
    fetch(`/api/orders/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.orderId) {
          this.setState({
            orderedItems: data,
            prevOrder: true
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
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
        <Grid item xs={12} md={7}>
          <Box pt={2} pl={1} pr={1}>
            <MenuList addToOrder={this.addItemToOrder} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box pt={2}>
            <OrderBill
              table={this.state.tableId}
              orderItem={this.state.orders}
              prevOrder={this.state.prevOrder}
              orderedItems={this.state.orderedItems}
              cancelOrder={this.clearOrderItems}
              updateItem={this.updateItemQty}
              taxRate={this.state.taxRate}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
}
