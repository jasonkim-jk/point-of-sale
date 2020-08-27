import React from 'react';
import ViewPay from './ViewPay';
import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';
import ViewCheckItem from './ViewCheckItem';
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';

export default class ViewRestaurant extends React.Component {
  render() {
    let { path, url } = this.props.match;
    const { history } = this.props;
    path = path.replace(/\/$/, '');
    url = url.replace(/\/$/, '');
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ViewChecks url={url} history={history} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              paddingTop: '4px',
              paddingRight: '4px',
              paddingLeft: '0px'
            }}
          >
            <Switch>
              <Route path={`${path}/paycheck/:checkId/:tableId`} component={ViewPay} />
              <Route path={`${path}/checkitem/:checkId/:tableId`} component={ViewCheckItem} />
              <Route exact path={path} component={FloorPlan} />
            </Switch>
          </Grid>
        </Grid>
      </>
    );
  }
}
