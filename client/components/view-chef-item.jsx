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
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = theme => ({
  list: {
    margin: theme.spacing(1, 1, 1, 3)
  },
  listToggle: {
    marginRight: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(0, 3)
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
    marginRight: theme.spacing(2)
  }
});

class ViewChefItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    // console.log(event.target.name, event.target.checked);
  }

  render() {
    const { classes } = this.props;
    const { tableId, items, ...others } = this.props.data;

    const lists = items.map(item => {
      return (
        <React.Fragment key={item.orderItemId}>
          <ListItem className={classes.list}>
            <Avatar className={classes.green}>{item.quantity}</Avatar>
            <ListItemText id={item.item} primary={item.item} />
            <ListItemSecondaryAction className={classes.listToggle}>
              <Switch
                name={item.orderItemId.toString()}
                onChange={this.handleToggle}
                checked={item.isCompleted}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" className={classes.divider} />
        </React.Fragment>
      );
    });

    return (
      <List
        subheader={
          <ListSubheader disableSticky>
            <Box mt={2} p={2} bgcolor="success.main">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography variant="h5">
                    Table {tableId}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {others.orderedAt}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </ListSubheader>
        }
      >
        {lists}
      </List>
    );
  }
}

export default withStyles(useStyles)(ViewChefItem);
