import React from 'react';
import Box from '@material-ui/core/Box';

import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';
import ViewCheckItem from './ViewCheckItem';
import {
  Switch,
  Route
} from 'react-router-dom';

export default class ViewRestaurant extends React.Component {

  render() {
    let { path, url } = this.props.match;
    path = path.replace(/\/$/, '');
    url = url.replace(/\/$/, '');
    return (

      <Box display="flex">

        <ViewChecks url={url} />
        <Switch>
          <Route path={`${path}/checkitem/:checkId/:tableId`} component={ViewCheckItem} />
          <Route exact path={path} component={FloorPlan} />
        </Switch>

      </Box>
    );
  }
}
