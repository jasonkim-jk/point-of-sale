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
    margin: theme.spacing(0, 2, 0, 0)
  },
  checkId: {
    margin: theme.spacing(0, 2, 0, 0)
  },
  betweenCheck: {
    margin: theme.spacing(0, 0, 1, 0)
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
    const jsTime = new Date(time);
    let hours = jsTime.getHours();
    let minutes = jsTime.getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = !hours ? 12 : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${hours}:${minutes} ${amPM}`;
    return timeString;
  }

  render() {
    const { classes } = this.props;
    const { url } = this.props;

    const noChecks = (
      <Grid item xs={12}>
        <Box m={4}>
          <Typography variant="h4" align="center">
            No Open Checks
          </Typography>
        </Box>
      </Grid>
    );

    const checks = this.state.openChecks.map(check => (
      <Grid item xs={12} key={check.checkId}>
        <Grid container className={classes.betweenCheck}>
          <Grid item xs={5}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" flexWrap="wrap">
              <Box>
                <Typography variant="h5" noWrap color="primary" className={classes.table}>
                  Table {check.tableId}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">{this.parseTime(check.createdAt)}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" flexWrap="wrap">
              <Box>
                <Typography align="right" variant="h6" noWrap className={classes.checkId}>
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
      <Box mt={3} ml={2} mb={2}>
        <Grid container spacing={1}>
          {checks.length > 0 ? checks : noChecks}
        </Grid>
      </Box>
    );
  }
}

export default withStyles(useStyles)(ViewChecks);
