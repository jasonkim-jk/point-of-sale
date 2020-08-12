import React from 'react';
import ViewPay from './ViewPay';
import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';
import ViewCheckItem from './ViewCheckItem';
import TablePopUp from './TablePopUp';
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';

export default class ViewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.viewDialog = this.viewDialog.bind(this);
    this.updateTables = this.updateTables.bind(this);
    this.changeTableStatus = this.changeTableStatus.bind(this);
    this.state = {
      floorPlan: [],
      dialogOpen: false,
      tableData: {}
    };
  }

  viewDialog(dialogOpen, tableData) {
    this.setState({
      dialogOpen: dialogOpen,
      tableData: tableData
    });
  }

  componentDidMount() {
    this.updateTables();
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

  changeTableStatus(tableId, newStatus) {
    newStatus = { newStatus: newStatus };
    fetch(`/api/restaurant/${tableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStatus)
    })
      .then(response => {
        this.updateTables();
      });
  }

  render() {
    let { path, url } = this.props.match;
    const { history } = this.props;
    path = path.replace(/\/$/, '');
    url = url.replace(/\/$/, '');
    return (
      <>
        <TablePopUp
          open={this.state.dialogOpen}
          tableData={this.state.tableData}
          viewDialog={this.viewDialog}
          changeTableStatus={this.changeTableStatus}
          history={history}
        />
        <Grid container spacing={2}>
          <Grid item xs={4} style={{ paddingTop: '0px' }}>
            <ViewChecks url={url} history={history} />
          </Grid>
          <Grid
            item xs={8}
            style={{
              paddingTop: '4px',
              paddingRight:
              '4px',
              paddingLeft:
              '0px'
            }}
          >
            <Switch>
              <Route
                path={`${path}/paycheck/:checkId/:tableId`}
                component={ViewPay} />
              <Route
                path={`${path}/checkitem/:checkId/:tableId`}
                component={ViewCheckItem} />
              <Route
                exact
                path={path}
                render={props => (
                  <FloorPlan
                    {...props}
                    floorPlan={this.state.floorPlan}
                    viewDialog={this.viewDialog}
                    dialogOpen={this.state.dialogOpen}
                  />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </>
    );
  }
}
