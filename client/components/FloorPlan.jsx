import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableButton from './TableButton';

export default class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.updateTables = this.updateTables.bind(this);
    this.state = {
      tables: []
    };
  }

  componentDidMount() {
    this.updateTables();
  }

  updateTables() {
    fetch('/api/restaurant')
      .then(response => response.json())
      .then(data => {
        this.setState({ tables: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { tables } = this.state;
    const tableList = tables.map(table => {
      return (
        <TableButton
          key={table.tableId}
          tableData={table}
          viewDialog={this.props.viewDialog}
          dialogOpen={this.props.dialogOpen}
        />
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
