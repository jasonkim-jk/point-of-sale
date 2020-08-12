import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableButton from './TableButton';

export default class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlan: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.floorPlan !== prevProps.floorPlan) {
      this.setState({
        floorPlan: this.props.floorPlan
      });
    }
  }

  componentDidMount() {
    this.setState({
      floorPlan: this.props.floorPlan
    });
  }

  render() {
    const { floorPlan } = this.state;
    const tableList = floorPlan.map(table => {
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
      <Box m={3}>
        <Grid container spacing={5} className="floorplan-container" style={{ backgroundColor: '#0B5B75' }}>
          {tableList}
        </Grid>
      </Box>
    );
  }
}
