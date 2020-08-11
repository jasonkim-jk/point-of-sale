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
import WaitListTableItem from './WaitListTableItem';

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
  },
  done: {
    marginRight: theme.spacing(2)
  }
});

class ViewChefItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.setState({ items: this.props.data.items });
    this.checkAllDont(this.props.data.items);
  }

  handleToggle(event) {
    const orderItemId = parseInt(event.target.name);
    const value = !event.target.checked;
    const reqBody = { isCompleted: value };
    const items = [...this.state.items];

    fetch(`/api/orderItems/${orderItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then(response => {
      if (response.status === 200) {
        for (const item of items) {
          if (item.orderItemId === orderItemId) {
            item.isCompleted = value;
            this.setState({ items: items });
          }
        }
        this.checkAllDont(items);
      }
    });
  }

  checkAllDont(items) {
    let completedItems = 0;

    for (const item of items) {
      if (item.isCompleted) completedItems++;
    }

    if (completedItems === items.length) {
      this.setState({ allDone: true });
    } else {
      this.setState({ allDone: false });
    }
  }

  elapsedTime(orderedAt) {
    const waitObj = new WaitListTableItem();
    const splitTime = orderedAt.split('T');
    const [hours, minutes] = splitTime[1].split(':');
    const SQLTime = `${hours}:${minutes}`;
    return waitObj.getWaitTime(SQLTime, 'short');
  }

  render() {
    if (!this.state.items) return <></>;

    const { classes } = this.props;
    const { tableId, ...others } = this.props.data;
    const items = this.state.items;

    const lists = items.map(item => {
      return (
        <React.Fragment key={item.orderItemId}>
          <ListItem className={classes.list}>
            <Avatar className={this.state.allDone || item.isCompleted ? classes.done : classes.green}>
              {item.quantity}
            </Avatar>
            <ListItemText id={item.item} primary={item.item} />
            <ListItemSecondaryAction className={classes.listToggle}>
              <Switch
                name={item.orderItemId.toString()}
                onChange={this.handleToggle}
                checked={!item.isCompleted}
                id={tableId.toString()}
                color="primary"
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
            <Box mt={2} p={2} bgcolor={this.state.allDone ? 'text.disabled' : 'success.main'}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography variant="h5">Table {tableId}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{this.elapsedTime(others.orderedAt)}</Typography>
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
