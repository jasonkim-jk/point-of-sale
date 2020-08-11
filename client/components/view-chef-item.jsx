import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  title: {
    color: 'blue'
  },
  list: {
    margin: theme.spacing(1, 1, 1, 3)
  },
  listToggle: {
    marginRight: theme.spacing(3)
  },
  devider: {
    margin: theme.spacing(0, 3)
  }
});

class ViewChefItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(value) {

  }

  render() {
    const { classes } = this.props;

    return (
      <List
        subheader={
          <ListSubheader>
            <Box mt={2} p={2} bgcolor="success.main">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography variant="h5" bgcolor="primary.main">
                    Table
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" color="textSecondary">
                    15:34
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </ListSubheader>
        }
      >
        <ListItem className={classes.list}>
          <ListItemText id="item1" primary="Gen Premium Streak" />
          <ListItemSecondaryAction className={classes.listToggle}>
            <Switch
              edge="end"
              onChange={this.handleToggle('wifi')}
              // checked={checked.indexOf('wifi') !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider component="li" className={classes.devider} />
        <ListItem className={classes.list}>
          <ListItemText id="id2" primary="Spicy Samgyubsal" />
          <ListItemSecondaryAction className={classes.listToggle}>
            <Switch
              edge="end"
              onChange={this.handleToggle('bluetooth')}
              // checked={checked.indexOf('bluetooth') !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(useStyles)(ViewChefItem);
