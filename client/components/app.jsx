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
import MenuCustomizer from './menu-customizer';

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
          <NavBar />
          <Switch>
            <Route exact path="/" component={ViewRestaurant} />
            <Route path="/wait-list">
              <WaitList />
            </Route>
            <Route path="/menu-customizer">
              <MenuCustomizer />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
