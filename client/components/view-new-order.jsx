import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
        <Grid item xs={6}>
          <Box bgcolor="primary.light" p={2} m={1}>
            left box
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor="error.main" p={2} m={1}>
            right box
          </Box>
        </Grid>
      </Grid>
    );
  }
}
