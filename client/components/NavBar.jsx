import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
  nav: {
    '&:hover': {
      color: '#00695c'
    },
    cursor: 'pointer',
    minHeight: 60,
    lineHeight: 1.3,
    paddingLeft: '8px',
    paddingRight: '8px'
  },
  padding: {
    padding: 0
  },
  navbar: {
    background: '#1dbe94'
  },
  align: {
    textAlign: 'center'
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar className={classes.padding}>
          <Grid container spacing={1} className={classes.align}>
            <Grid item xs={6} sm>
              <Link to="/">
                <Button size="large" color="inherit" className={classes.nav}>
                  Restaurant View
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} sm>
              <Link to="/chef">
                <Button size="large" color="inherit" className={classes.nav}>
                  Chef View
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4} sm>
              <Link to="/wait-list">
                <Button size="large" color="inherit" className={classes.nav}>
                  Waiting List
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4} sm>
              <Link to="/menu-customizer">
                <Button size="large" color="inherit" className={classes.nav}>
                  Menu Customizer
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4} sm>
              <Link to="/sales-report">
                <Button size="large" color="inherit" className={classes.nav}>
                  Sales Report
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(NavBar);
