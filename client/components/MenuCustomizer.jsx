import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCustomizerTable from './MenuCustomizerTable';
import MenuCustomizerForm from './MenuCustomizerForm';

export default class MenuCustomizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      formStatusEdit: false,
      formEditItem: {}
    };
    this.reloadMenus = this.reloadMenus.bind(this);
    this.editItem = this.editItem.bind(this);
    this.clearEditItem = this.clearEditItem.bind(this);
  }

  componentDidMount() {
    this.getMenus();
  }

  getMenus() {
    fetch('/api/menus')
      .then(response => response.json())
      .then(data => {
        this.setState({
          menus: data,
          formStatusEdit: false,
          formEditItem: {}
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  reloadMenus() {
    this.getMenus();
  }

  editItem(itemId) {
    for (const item of this.state.menus) {
      if (item.itemId === parseInt(itemId)) {
        const editItem = { ...item };
        this.setState({
          formStatusEdit: true,
          formEditItem: editItem
        });
        break;
      }
    }
  }

  clearEditItem() {
    this.setState({ formStatusEdit: false, formEditItem: {} });
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <MenuCustomizerTable
            menuList={this.state.menus}
            reloadMenus={this.reloadMenus}
            editItem={this.editItem}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MenuCustomizerForm
            reloadMenus={this.reloadMenus}
            editView={this.state.formStatusEdit}
            editItem={this.state.formEditItem}
            resetItem={this.clearEditItem}
          />
        </Grid>
      </Grid>
    );
  }
}
