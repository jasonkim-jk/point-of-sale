import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCustomizerTable from './menu-customizer-table';
import MenuCustomizerForm from './menu-customizer-form';

export default class MenuCustomizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
    this.reloadMenus = this.reloadMenus.bind(this);
  }

  componentDidMount() {
    this.getMenus();
  }

  getMenus() {
    fetch('/api/menus')
      .then(response => response.json())
      .then(data => {
        this.setState({ menus: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  reloadMenus() {
    this.getMenus();
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <MenuCustomizerTable menuList={this.state.menus} />
        </Grid>
        <Grid item xs={4}>
          <MenuCustomizerForm reloadMenus={this.reloadMenus} />
        </Grid>
      </Grid>
    );
  }
}
