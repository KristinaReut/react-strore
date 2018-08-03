import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getAllCategories } from '../api';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class ProductsEdit extends Component {
  state = {
    productName: '',
    price: '',
    description: '',
    product: '',
    color: '',
    image: '',
    category: '',
    products: [],
    open: false,
    categories: [],
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }

  openDialog = () => {
    this.setState({
      open: true
    })
  }
  componentDidMount() {
    this.setState({
      productName: this.props.product.productName,
      price: this.props.product.price,
      color: this.props.product.color,
      image: this.props.product.image,
      description: this.props.product.description,
      category: this.props.product.category,
    })
  }
  handleChange = (productName, price, color, description, image, category) => (event) => {
    this.setState({
      [productName]: event.target.value,
      [price]: event.target.value,
      [color]: event.target.value,
      [description]: event.target.value,
      [image]: event.target.value,
      [category]: event.target.value,
    });
  };

  updateProduct = () => {
    const { updateProduct } = this.props
    const product = this.props.product
    const id = product.id;
    const { productName, price, color, description, category, image } = this.state
    const updatedProduct = { productName, price, color, description, category, image }
    updateProduct(id, updatedProduct)
    this.handleClose()
  }

  render() {
    const { classes, product } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button} type="submit" products={this.state.products}
          onClick={this.openDialog}>
          Edit
            </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Edit
          </DialogContentText>
            <TextField
              label="Name"
              margin="normal"
              value={this.state.productName}
              onChange={this.handleChange('productName')}
            />
            <TextField
              label="Price"
              margin="normal"
              type="number"
              value={this.state.price}
              onChange={this.handleChange('price')}
            />
            <TextField
              label="Description"
              margin="normal"
              value={this.state.description}
              onChange={this.handleChange('description')}
            />
            <Select
            label="Select"
            className={classes.selectEmpty}
          >
            <MenuItem onChange={this.handleChange("category")} value={this.state.category}>{this.state.category}</MenuItem>
          </Select>
           
            <TextField
              label="Color"
              margin="normal"
              value={this.state.color}
              onChange={this.handleChange('color')}
            />
            <TextField
              label="Image"
              margin="normal"
              value={this.state.image}
              onChange={this.handleChange('image')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
          </Button>
            <Button onClick={this.updateProduct} color="primary" autoFocus>
              Agree
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ProductsEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsEdit);


