import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
  table: {
    margin: theme.spacing(1.5, 0, 1.5, 1)
  },
  time: {
    margin: theme.spacing(0, 0, 2.5, 1)
  },
  checkId: {
    margin: theme.spacing(1.5, 1, 0, 0)
  },
  checkBtn: {
    margin: theme.spacing(1.5, 1, 0, 0)
  }
});

class ViewChecks extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      openChecks: []
    };
    this.parseTime = this.parseTime.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.getData();
    this.unlisten = this.props.history.listen((location, action) => {
      this.getData();

    });

  }

  getData() {
    fetch('/api/checks')
      .then(res => res.json())
      .then(data => {
        if (this.mounted) {
          this.setState({ openChecks: data });
        }
      })
      .catch(() => console.error('server response error'));

  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten();

  }

  parseTime(time) {
    // 2020-06-03T07:00:00.000Z
    const splitTime = time.split('T');
    const furtherSplit = splitTime[1].split(':');
    let [hours, minutes] = furtherSplit;
    hours = parseInt(hours, 10);
    // this is for timezone.  Idk why 5 works
    hours += 5;
    if (hours > 12) {
      hours -= 12;
    }
    let amPM = 'AM';
    if (hours > 11) {
      amPM = 'PM';
    }
    if (hours === 24 || hours === 0) {
      hours = 12;
      amPM = 'AM';
    } else if (hours > 12) {
      hours -= 12;
    }
    return `${hours}:${minutes} ${amPM}`;
  }

  render() {
    const { classes } = this.props;
    const { url } = this.props;

    const checks = this.state.openChecks.map(check => (
      <Grid item xs={12} key={check.checkId}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              noWrap
              color="primary"
              className={classes.table}
            >
              Table {check.tableId}
            </Typography>
            <Typography variant="h5" className={classes.time}>
              {this.parseTime(check.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end" flexWrap="wrap">
              <Box>
                <Typography
                  align="right"
                  variant="h5"
                  noWrap
                  className={classes.checkId}
                >
                  Check #{check.checkId}
                </Typography>
              </Box>
              <Box>
                <Link to={`${url}/checkitem/${check.checkId}/${check.tableId}`}>
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.checkId}
                    startIcon={<ReceiptIcon />}
                    style={{
                      backgroundColor: '#1DBE94',
                      color: 'white'
                    }}
                  >
                      View Check
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    ));

    return (
      <Box m={2}>
        <Grid container spacing={1}>
          {checks.length > 0 ? checks : (
            <div> No Tables Found </div>
          )}
        </Grid>
      </Box>
    );
  }
}

export default withStyles(useStyles)(ViewChecks);
