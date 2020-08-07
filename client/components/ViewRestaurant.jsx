import React from 'react';
import Box from '@material-ui/core/Box';

import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';

export default class ViewRestaurant extends React.Component {

  render() {

    return (

      <Box display="flex">

        <ViewChecks />
        <FloorPlan />

      </Box>
    );
  }
}
