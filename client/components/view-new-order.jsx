import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuList from './menu-list';
import OrderBill from './order-bill';

export default class ViewNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableId: 5,
      menus: []
    };
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <MenuList />
        </Grid>
        <Grid item xs={5}>
          <OrderBill table={this.state.tableId} />
        </Grid>
      </Grid>
    );
  }
}
