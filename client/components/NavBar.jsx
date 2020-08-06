import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  nav: {
    marginLeft: '10px',
    cursor: 'pointer'
  },
  navbar: {
    background: '#073b4c'
  }
});

class NavBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography className={classes.nav} variant="h6">Restaurant View</Typography>
          <Typography className={classes.nav} variant="h6">Table View</Typography>
          <Typography className={classes.nav} variant="h6">Order Status</Typography>
          <Typography className={classes.nav} variant="h6">Waiting List</Typography>
          <Typography className={classes.nav} variant="h6">Menu Customizer</Typography>
          <Typography className={classes.nav} variant="h6">Sales Report</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(NavBar);
