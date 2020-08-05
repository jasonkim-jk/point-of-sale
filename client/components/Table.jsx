import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class Table extends React.Component {

  render() {
    const { tableData } = this.props;
    const { tableId, tableStatus, timeSeated } = tableData;

    const statuses = {
      0: {
        status: 'Empty',
        color: '#C4C4C4'
      },
      1: {
        status: 'Billed',
        color: '#EF476F'
      },
      2: {
        status: 'Seated',
        color: '#1DBE94'
      }
    };
    const thisStatus = statuses[tableStatus];
    const { status, color } = thisStatus;
    return (

      <Grid item xs={3}>
        <Button variant="contained" className="table-button" style={{ backgroundColor: color }}>T{tableId}<br />{status} <br /> {timeSeated}</Button>
      </Grid>

    );
  }
}
