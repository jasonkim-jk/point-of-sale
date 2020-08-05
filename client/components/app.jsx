import React from 'react';
import ViewRestaurant from './ViewRestaurant';
import ViewNewOrder from './view-new-order';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <>
        <ViewRestaurant />
        <ViewNewOrder />
      </>
    );
  }
}
