import React from 'react';
import MenuCustomizerTable from './menu-customizer-table';

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
      <MenuCustomizerTable menuList={this.state.menus} />
    );
  }
}
