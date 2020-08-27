import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableButton from './TableButton';
import TablePopUp from './TablePopUp';

export default class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlan: [],
      dialogOpen: false,
      tableData: {}
    };
    this.viewDialog = this.viewDialog.bind(this);
    this.changeTableStatus = this.changeTableStatus.bind(this);
  }

  componentDidMount() {
    this.updateTables();
  }

  viewDialog(dialogOpen, tableData) {
    this.setState({
      dialogOpen: dialogOpen,
      tableData: tableData
    });
  }

  changeTableStatus(tableId, newStatus) {
    newStatus = { newStatus: newStatus };
    fetch(`/api/restaurant/${tableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStatus)
    }).then(response => {
      this.updateTables();
    });
  }

  updateTables() {
    fetch('/api/restaurant')
      .then(response => response.json())
      .then(data => {
        this.setState({ floorPlan: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { floorPlan } = this.state;
    const tableList = floorPlan.map(table => {
      return (
        <TableButton key={table.tableId} tableData={table} viewDialog={this.viewDialog} dialogOpen={this.dialogOpen} />
      );
    });

    return (
      <>
        <TablePopUp
          open={this.state.dialogOpen}
          tableData={this.state.tableData}
          viewDialog={this.viewDialog}
          changeTableStatus={this.changeTableStatus}
          history={this.props.history}
        />

        <Box m={3}>
          <Grid container spacing={5} className="floorplan-container" style={{ backgroundColor: '#eceff1' }}>
            {tableList}
          </Grid>
        </Box>
      </>
    );
  }
}
