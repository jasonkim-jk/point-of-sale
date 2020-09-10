import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  title: {
    padding: theme.spacing(2)
  },
  form: {
    padding: theme.spacing(0, 2),
    margin: theme.spacing(0)
  },
  upload: {
    display: 'none'
  },
  uploadBtn: {
    padding: theme.spacing(1.5)
  },
  button: {
    minWidth: 100,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 2)
  },
  imageName: {
    padding: theme.spacing(1),
    fontStyle: 'italic',
    color: 'gray'
  }
});

class MenuCustomizerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      item: '',
      cost: '',
      salePrice: '',
      image: '',
      tag: ''
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editView && nextProps.editItem.item !== prevState.item) {
      const menu = nextProps.editItem;
      return {
        editView: true,
        item: menu.item,
        cost: menu.cost,
        salePrice: menu.salePrice,
        tag: '',
        image: ''
      };
    }
    return true;
  }

  handleReset() {
    this.setState({
      editView: false,
      item: '',
      cost: '',
      salePrice: '',
      image: '',
      tag: ''
    });
    this.props.resetItem();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendItem(event.target, this.props.editView);
    this.handleReset();
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  sendItem(event, editView) {
    let url = '';
    let reqType = '';

    if (editView) {
      url = `/api/menus/${this.props.editItem.itemId}`;
      reqType = 'PUT';
    } else {
      url = '/api/menus';
      reqType = 'POST';
    }

    const formData = new FormData();
    formData.append('item', this.state.item);
    formData.append('cost', parseFloat(this.state.cost).toFixed(2));
    formData.append('salePrice', parseFloat(this.state.salePrice).toFixed(2));
    if (this.state.image) {
      formData.append('image', event.image.files[0]);
    } else {
      formData.append('image', null);
    }

    fetch(url, {
      method: reqType,
      body: formData
    })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          this.props.reloadMenus();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    const titleText = this.props.editView ? 'Edit Menu' : 'Add New Menu';
    const buttonText = this.props.editView ? 'Edit' : 'Add';

    return (
      <Box mt={2}>
        <Typography variant="h4" align="center" className={classes.title}>
          {titleText}
        </Typography>
        <form
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          name="menuForm"
        >
          <FormControl fullWidth className={classes.form}>
            <TextField
              onChange={this.handleChange}
              value={this.state.item}
              margin="normal"
              id="item"
              label="Name"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantMenuIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.cost}
              required
              margin="normal"
              id="cost"
              label="Cost"
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.salePrice}
              required
              margin="normal"
              id="salePrice"
              label="Sale Price"
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalAtmOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.tag}
              margin="normal"
              id="tag"
              label="Tag"
              variant="outlined"
              helperText="Optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <Box mt={1}>
              <input
                accept="image/*"
                className={classes.upload}
                id="image"
                name="image"
                type="file"
                onChange={this.handleChange}
              />
              <label htmlFor="image">
                <Button
                  variant="outlined"
                  color="default"
                  component="span"
                  size="large"
                  fullWidth
                  className={classes.uploadBtn}
                >
                  Menu Image Upload
                </Button>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.imageName}
                >
                  {this.state.image}
                </Typography>
              </label>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              mt={5}
              p={1}
              bgcolor="background.paper"
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                {buttonText}
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withStyles(useStyles)(MenuCustomizerForm);
