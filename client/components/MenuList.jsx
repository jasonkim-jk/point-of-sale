import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCard from './MenuCard';

export default class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    this.props.addToOrder(item);
  }

  componentDidMount() {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => this.setState({ menus: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const menuCard = this.state.menus.map(menu => (
      <Grid item xs={6} sm={4} key={menu.itemId}>
        <MenuCard menuItem={menu} addItem={this.addItem}/>
      </Grid>
    ));

    return (
      <Grid container spacing={3}>
        {menuCard}
      </Grid>
    );
  }
}
