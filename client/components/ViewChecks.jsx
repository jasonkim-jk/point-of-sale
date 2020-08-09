import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {
  Link
} from 'react-router-dom';

export default class ViewChecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openChecks: []
    };
    this.parseTime = this.parseTime.bind(this);
  }

  componentDidMount() {
    fetch('/api/checks')
      .then(res => res.json())
      .then(data => {
        this.setState({ openChecks: data });
      })
      .catch(() => console.error('server response error'));
  }

  parseTime(crap) {
    // 2020-06-03T07:00:00.000Z
    const time = crap.split('T')[1];
    const fullTime = time.split(':');
    let hrs = fullTime[0];
    const mins = fullTime[1];
    const AMOrPM = parseInt(hrs) === 24 || parseInt(hrs) < 12 ? 'AM' : 'PM';
    if (hrs > 12) {
      hrs -= 12;
    }
    const hrsAndMinutes = `${hrs}:${mins}`;
    return `${hrsAndMinutes} ${AMOrPM}`;
  }

  render() {
    const { url } = this.props;
    const checks = this.state.openChecks.map(check => (
      <Grid item xs={12} key={check.checkId}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography component="div">
              <Box fontWeight="fontWeightBold">
                Check #{check.checkId}
              </Box>
              {this.parseTime(check.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography align="right" style={{ marginTop: '-5px' }}>
            Table {check.tableId}<br></br>
              <Button size="small" variant="contained" style={{ backgroundColor: '#118AB2', color: 'white', fontSize: '10px', marginBottom: '10px', borderRadius: '0px', padding: '2px 8px' }}>
                <Link to={`${url}/checkitem/${check.checkId}`}>
            View Check
                </Link>
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Divider/>
      </Grid>
    ));

    return (
      <Box m={2} width="50%" fontWeight="fontWeightBold">
        <Grid container spacing={1}>
          {checks}
        </Grid>
      </Box>

    );
  }
}
