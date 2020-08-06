import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCard from './menu-card';

export default class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
  }

  componentDidMount() {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => this.setState({ menus: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const menuCard = this.state.menus.map(menu => (
      <Grid item xs={4} key={menu.itemId}>
        <MenuCard menuItem={menu} />
      </Grid>
    ));

    return (
      <Grid container spacing={3}>
        {menuCard}
      </Grid>
    );
  }
}
