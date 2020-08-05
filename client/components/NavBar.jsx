import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class NavBar extends React.Component {

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">I am a NavBar</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
