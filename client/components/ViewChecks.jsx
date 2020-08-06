import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Link
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

export default class ViewChecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openChecks: []
    };
  }

  componentDidMount() {
    fetch('/api/checks')
      .then(res => res.json())
      .then(data => {
        this.setState({ openChecks: data });
      })
      .catch(() => console.error('server response error'));
  }

  render() {
    const { url } = this.props;
    const checks = this.state.openChecks.map(check => (
      <div key={check.checkId}>
        Order {check.checkId} <br></br>
        Time {check.createdAt} <br></br>
        Table {check.tableId} <br></br>
        <Button size="small" variant="contained" color="primary">
          <Link to={`${url}/checkitem/${check.checkId}`}>
            View Check
          </Link>
        </Button>
      </div>
    ));

    return (
      <Grid className="checks-container">
        {checks}
      </Grid>
    );
  }
}
