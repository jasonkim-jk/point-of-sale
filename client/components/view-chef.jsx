import React from 'react';
import Grid from '@material-ui/core/Grid';
import ViewChefItem from './view-chef-item';

export default class ViewChef extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        this.setState({ orders: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.orders) return <></>;

    const tableOrderItems = this.state.orders.map(table => {
      return (
        <Grid item xs={4} key={table.orderId}>
          <ViewChefItem data={table} />
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
