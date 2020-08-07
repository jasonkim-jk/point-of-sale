import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Link
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
    const time = crap.split('T')[1];
    const fullTime = time.split(':');
    const hrs = fullTime[0];
    const mins = fullTime[1];
    const hrsAndMinutes = `${hrs}:${mins}`;
    const AMOrPM = parseInt(hrs) === 24 || parseInt(hrs) < 12 ? 'AM' : 'PM';
    return `${hrsAndMinutes} ${AMOrPM}`;
  }

  render() {
    const { url } = this.props;
    const checks = this.state.openChecks.map(check => (
      <Typography component="div" key={check.checkId}>
        Order {check.checkId} <br></br>
        Time {this.parseTime(check.createdAt)} <br></br>
        Table {check.tableId} <br></br>
        <Button size="small" variant="contained" color="primary">
          <Link to={`${url}/checkitem/${check.checkId}`}>
            View Check
          </Link>
        </Button>
        <hr className="new1"></hr>
      </Typography>

    ));

    return (
      <Box className="checks-container">
        {checks}
      </Box>
    );
  }
}
