import React from 'react';
import ViewRestaurant from './ViewRestaurant';
import Tests from './MaterialUITests';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  render() {
    return (
      <>
        <Tests/>
        <ViewRestaurant />
      </>
    );
  }
}
