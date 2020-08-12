import React from 'react';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './NavBar';
import ViewRestaurant from './ViewRestaurant';
import ViewChef from './view-chef';
import WaitList from './WaitList';
import MenuCustomizer from './menu-customizer';
import SaleReport from './sales-report';
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
      <Router>
        <Container disableGutters={true}>
          <NavBar />
          <Switch>
            <Route path="/chef">
              <ViewChef />
            </Route>
            <Route path="/wait-list">
              <WaitList />
            </Route>
            <Route path="/menu-customizer">
              <MenuCustomizer />
            </Route>
            <Route path="/order/:tableId" component={ViewNewOrder} />
            <Route path="/sales-report">
              <SaleReport />
            </Route>
            <Route strict path="/" component={ViewRestaurant} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
