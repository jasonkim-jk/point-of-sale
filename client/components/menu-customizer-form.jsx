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
import axios from 'axios';
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
      viewType: 'add',
      item: '',
      cost: '',
      salePrice: '',
      image: '',
      tag: ''
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeViewType = this.changeViewType.bind(this);
  }

  sendNewItem(event) {
    const formData = new FormData();
    formData.append('item', this.state.item);
    formData.append('cost', parseFloat(this.state.cost).toFixed(2));
    formData.append('salePrice', parseFloat(this.state.salePrice).toFixed(2));
    formData.append('image', event.image.files[0]);

    axios.post('/api/menus', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.status === 201) {
        this.props.reloadMenus();
      }
    }).catch(error => {
      console.error(error);
    });
  }

  handleReset() {
    this.setState({
      item: '',
      cost: '',
      salePrice: '',
      image: '',
      tag: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendNewItem(event.target);
    this.handleReset();
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  changeViewType(type) {
    this.setState({ viewType: type });
  }

  render() {
    const { classes } = this.props;
    const titleText = this.state.viewType === 'add' ? 'Add New Menu' : 'Edit Menu';
    const buttonText = this.state.viewType === 'add' ? 'Add' : 'Edit';

    return (
      <Box mt={2}>
        <Typography variant="h4" align="center" className={classes.title}>
          {titleText}
        </Typography>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset} name='menuForm'>
          <FormControl fullWidth className={classes.form}>
            <TextField onChange={this.handleChange} value={this.state.item}
              margin="normal" id="item" label="Name" variant="outlined" required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantMenuIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField onChange={this.handleChange} value={this.state.cost} required
              margin="normal" id="cost" label="Cost" variant="outlined" type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                )
              }}/>
            <TextField onChange={this.handleChange} value={this.state.salePrice} required
              margin="normal" id="salePrice" label="Sale Price" variant="outlined" type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalAtmOutlinedIcon />
                  </InputAdornment>
                )
              }}/>
            <TextField onChange={this.handleChange} value={this.state.tag}
              margin="normal" id="tag" label="Tag" variant="outlined" helperText="Optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferOutlinedIcon />
                  </InputAdornment>
                )
              }}/>
            <Box mt={1}>
              <input accept="image/*" className={classes.upload} id="image" name="image" type="file" onChange={this.handleChange}/>
              <label htmlFor="image">
                <Button variant="outlined" color="default" component="span" size="large" fullWidth
                  className={classes.uploadBtn}>Menu Image Upload</Button>
                <Typography variant="caption" display="block" className={classes.imageName}>{this.state.image}</Typography>
              </label>
            </Box>
            <Box display="flex" justifyContent="center" mt={5} p={1} bgcolor="background.paper">
              <Button type="submit" variant="contained" color="primary" className={classes.button}>{buttonText}</Button>
              <Button type="reset" variant="contained" color="secondary" className={classes.button}>Cancel</Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withStyles(useStyles)(MenuCustomizerForm);
