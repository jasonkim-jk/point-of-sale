import React from 'react';
import FloorPlan from './FloorPlan';
import ViewChecks from './ViewChecks';

export default class ViewRestaurant extends React.Component {

  render() {

    return (

      <div className='view-restaurant-container'>
        <ViewChecks />

        <FloorPlan />

      </div>
    );
  }
}
