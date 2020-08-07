import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
    const hrs = fullTime[0];
    const mins = fullTime[1];
    const hrsAndMinutes = `${hrs}:${mins}`;
    const AMOrPM = parseInt(hrs) < 12 ? 'AM' : 'PM';
    return `${hrsAndMinutes} ${AMOrPM}`;
  }

  render() {

    const checks = this.state.openChecks.map(check => (
      <Grid item xs={12} className="item-container" key={check.checkId}>
        <Grid container spacing={1}>
          <Grid item xs={6} className="left-check">
            <Typography component="div">
              <Box fontWeight="fontWeightBold">
                Order {check.checkId} <br></br>
              </Box>
              {this.parseTime(check.createdAt)} <br></br>
            </Typography>
          </Grid>
          <Grid item xs={5} className="right-check">
            <Typography>
            Table {check.tableId} <br></br>

            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ));

    return (
      <Box width="50%" fontWeight="fontWeightBold">
        <Grid container spacing={1}>
          {checks}
        </Grid>
      </Box>

    );
  }
}
