import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createProduct , getAllProducts } from '../api';
import ProductsTableRow from  './ProductsTableRow' 
import {  getAllCategories } from '../api';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'green',
  },
  input: {
    display: 'none',
  },
});

class Products extends Component {
  state = {
    products: [],
    productName: '',
    price: '',
    color: '',
    description: '',
    category: '',
    image: '',

  }
  handleChange = (productName, price, color, description, image) => (event) => {
    this.setState({
      [productName]: event.target.value,
      [price]: event.target.value,
      [color]: event.target.value,
      [description]: event.target.value,
      [image]: event.target.value,
    });
  };
  

  loadAllProducts = () => {
    getAllProducts().then(products => {
      this.setState({ products });
    });
  };
  /*loadAllCategories = () => {
    getAllCategories().then(categories => {
      this.setState({ categories });
       this.loadAllCategories();
    });
    <TextField
        required
          select
          label="Select category"
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          option={category}
          onChange={this.handleChange('')}
        />
  }; */

  componentDidMount() {
    this.loadAllProducts();
  }

  handleSubmit = (e) => {
    e.preventDefault();
   
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.productName.trim().length > 0 && this.state.price.trim().length > 0 && this.state.color.trim().length > 0 && this.state.image.trim().length > 0) {
      const {  productName, price, color, description, image } = this.state;
      this.setState({  productName: '',
      price: '',
      color: '',
      description: '',
      category: '',
      image: '',});
      createProduct({productName, price, color, description, image}).then(this.loadAllProducts);
    }
  }

  render() {
    const {classes} = this.props;
    const { products, productName, price, color, description, image } = this.state;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" >
        <TextField
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          select
          label="Category-filter"
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select category"
          margin="normal"
        />
        </form>
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell numeric>Name</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Description</TableCell>
            <TableCell numeric>Category</TableCell>
            <TableCell numeric>Image</TableCell>
            <TableCell numeric>Color</TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric>Featured</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
                products.map((product, index) => (
                  <ProductsTableRow
                    index={index}
                    product={product}
                  />
                ))
              }
        </TableBody>
      </Table>
    </Paper>
    <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
    <TextField
          required
          label="Name"
          className={classes.textField}
          margin="normal"
          value={productName}
          onChange={this.handleChange('productName')}
        />
   <TextField
          required
          label="Price"
          type="number"
          className={classes.textField}
          margin="normal"
          value={price}
          onChange={this.handleChange('price')}
        />
       <TextField
          label="Description"
          className={classes.textField}
          margin="normal"
          value={description}
          onChange={this.handleChange('description')}
        />
        
        <TextField
          required
          label="IMG URL"
          type="url"
          className={classes.textField}
          margin="normal"
          value={image}
          onChange={this.handleChange('image')}
        />
           <TextField
          required
          label="Color"
          className={classes.textField}
          margin="normal"
          value={color}
          onChange={this.handleChange('color')}
        />
        < Button variant="contained" size="small" color="primary" className={classes.button} onClick={this.handleSubmit} disabled={this.state.disabled}>
        Add Product
      </Button>
        </form>
      </div>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);