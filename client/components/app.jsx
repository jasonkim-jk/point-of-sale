import React from 'react';
import ViewRestaurant from './ViewRestaurant';

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
      <ViewRestaurant />
    );
  }
}
