import React from 'react';
import ViewRestaurant from './ViewRestaurant';
import Container from '@material-ui/core/Container';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// import ViewNewOrder from './view-new-order';

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
      <Router>
        <Container disableGutters={true}>
          <NavBar/>
          <Switch>
            <Route exact path="/">
              <ViewRestaurant />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
