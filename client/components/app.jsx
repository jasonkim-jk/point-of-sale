import React from 'react';
import ViewRestaurant from './ViewRestaurant';
import Container from '@material-ui/core/Container';
import NavBar from './NavBar';

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
      <Container>
        <NavBar/>
        <ViewRestaurant />
      </Container>
    );
  }
}
