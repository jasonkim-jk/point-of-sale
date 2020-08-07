import React from 'react';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './NavBar';
import ViewRestaurant from './ViewRestaurant';
// import ViewNewOrder from './view-new-order';
import WaitList from './WaitList';

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
            <Route path="/wait-list">
              <WaitList/>
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
