import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ViewChefItem from './ViewChefItem';

export default class ViewChef extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOrderData = this.getOrderData.bind(this);
    this.deleteTable = this.deleteTable.bind(this);
  }

  componentDidMount() {
    this.getOrderData();
    this.interval = setInterval(this.getOrderData, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getOrderData() {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        this.setState({ orders: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteTable(orderId) {
    const orders = [...this.state.orders];
    for (const [index, item] of orders.entries()) {
      if (item.orderId === orderId) {
        orders.splice(index, 1);
        this.updateOrderStatus(orderId, true, orders);
      }
    }
  }

  updateOrderStatus(orderId, value, stateData) {
    const reqBody = { isSent: value };

    fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then(response => {
      if (response.status === 200) {
        this.setState({ orders: stateData });
      }
    });
  }

  render() {
    if (!this.state.orders || !this.state.orders.length) {
      return (
        <Box mt={4}>
          <Typography variant="h4" align="center">
            There are no orders yet.
          </Typography>
        </Box>
      );
    }

    const tableOrderItems = this.state.orders.map(table => {
      return (
        <Grid item xs={12} md={4} key={table.orderId}>
          <ViewChefItem data={table} deleteCompletedOrder={this.deleteTable} />
        </Grid>
      );
    });

    return (
      <Grid container spacing={3}>
        {tableOrderItems}
      </Grid>
    );
  }
}
