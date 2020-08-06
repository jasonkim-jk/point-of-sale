import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
  nav: {
    '&:hover': {
      color: '#ffd166'
    },
    marginLeft: '10px',
    cursor: 'pointer',
    height: '100%'
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
          <Button size="large" color="inherit" className={classes.nav}>Restaurant View</Button>
          <Button size="large" color="inherit" className={classes.nav} >Table View</Button>
          <Button size="large" color="inherit" className={classes.nav} >Order Status</Button>
          <Button size="large" color="inherit" className={classes.nav} >Waiting List</Button>
          <Button size="large" color="inherit" className={classes.nav} >Menu Customizer</Button>
          <Button size="large" color="inherit" className={classes.nav} >Sales Report</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(NavBar);
