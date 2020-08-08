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
  }

  componentDidMount() {
    fetch('/api/menus')
      .then(response => response.json())
      .then(data => {
        this.setState({ menus: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <MenuCustomizerTable menuList={this.state.menus} />
        </Grid>
        <Grid item xs={4}>
          <MenuCustomizerForm />
        </Grid>
      </Grid>
    );
  }
}
