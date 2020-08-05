import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuList from './menu-list';

export default class ViewNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <Box bgcolor="text.hint" p={2} m={1}>
            right box
          </Box>
        </Grid>
      </Grid>
    );
  }
}
