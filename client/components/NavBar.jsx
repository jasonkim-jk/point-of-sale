import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
  nav: {
    '&:hover': {
      color: '#ffd166'
    },
    cursor: 'pointer',
    height: '100%'
  },
  padding: {
    padding: 0
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
        <Toolbar className={classes.padding}>
          <Link to='/'>
            <Button size="large" color="inherit" className={classes.nav}>Restaurant View</Button>
          </Link>
          <Link to='/table'>
            <Button size="large" color="inherit" className={classes.nav}>Table View</Button>
          </Link>
          <Link to='/orders'>
            <Button size="large" color="inherit" className={classes.nav} >Order Status</Button>
          </Link>
          <Link to='/wait-list'>
            <Button size="large" color="inherit" className={classes.nav} >Waiting List</Button>
          </Link>
          <Link to='/menu-customizer'>
            <Button size="large" color="inherit" className={classes.nav} >Menu Customizer</Button>
          </Link>
          <Link to='/sales-report'>
            <Button size="large" color="inherit" className={classes.nav} >Sales Report</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(NavBar);
