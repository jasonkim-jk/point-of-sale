import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { TableButton } from './TableButton';

export default class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
  }

  componentDidMount() {
    fetch('/api/restaurant')
      .then(response => response.json())
      .then(data => {
        this.setState({ tables: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // This is just a placeholder for now
  parseTimeSeated(timeSeated) {
    if (timeSeated) {
      return timeSeated;
    }
    return '';
  }

  render() {
    const { tables } = this.state;
    const tableList = tables.map(table => {
      const { tableId, tableStatus, timeSeated } = table;
      let color;
      switch (tableStatus) {
        case (0):
          color = 'default';
          break;
        case (1):
          color = 'primary';
          break;
        case (2):
          color = 'secondary';
          break;
        default:
      }
      const children = <div>{`T${tableId}`}<div>{this.parseTimeSeated(timeSeated)}</div></div>;
      return (
        <TableButton key={tableId} tableData={table} color={color} text={children} status={table}/>
      );
    });

    return (
      <Box style={{ backgroundColor: '#0B5B75', marginTop: '0px' }}>
        <Grid container spacing={3} className="floorplan-container">
          {tableList}
        </Grid>
      </Box>
    );
  }
}
