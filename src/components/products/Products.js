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
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { createProduct, getAllProducts, deleteProduct, updatedProduct } from '../api';
import ProductsTableRow from './ProductsTableRow'
import { getAllCategories } from '../api';

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
    filteredProducts: [],
    categories: [],
    filter: {
      query: '',
    },
    
  }
  handleFilterChange = name => event => {
    const { filter, products } = this.state;
    filter[name] = event.target.value;
    const filteredProducts = this.filterProducts(products, filter);
    this.setState({
      filter,
      filteredProducts
    });
  };

  filterProducts = (products, filter) =>
    products
      .filter(
        product =>
          filter.query.length > 2
            ? product.productName.toLowerCase().includes(filter.query.toLowerCase()) || product.color.toLowerCase().includes(filter.query.toLowerCase()) || product.description.toLowerCase().includes(filter.query.toLowerCase()) || product.image.toLowerCase().includes(filter.query.toLowerCase()) || product.category.toLowerCase().includes(filter.query.toLowerCase())
            : true
      );
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  loadProducts = () => {
    getAllProducts().then(products => {
      const { filter } = this.state;
      const filteredProducts = this.filterProducts(products, filter);
      this.setState({ products, filteredProducts });
    });
  };

  onUpdate = (id, data) => {
    updatedProduct(id, data).then(this.loadProducts);
  };

  componentWillMount() {
    Promise.all([getAllCategories(), getAllProducts()]).then(([categories, products]) => {
      const { filter } = this.state;
      const filteredProducts = this.filterProducts(products, filter);
      this.setState({
        categories,
        products,
        filteredProducts
      });
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.productName.trim().length > 0 && this.state.price.trim().length > 0 && this.state.color.trim().length > 0 && this.state.image.trim().length > 0) {
      const { productName, price, color, description, category, image } = this.state;
      this.setState({
        productName: '',
        price: '',
        color: '',
        description: '',
        category: '',
        image: '',
      });
      createProduct({ productName, price, color, description, category, image }).then(this.loadProducts);
    }
  }
  deleteProduct = (id) => {
    deleteProduct(id).then(this.loadProducts)
  }
  updateProduct = (id, updateProduct) => {
    updatedProduct(id, {
      productName: updateProduct.productName,
      price: updateProduct.price,
      color: updateProduct.color,
      description: updateProduct.description,
      category: updateProduct.category,
      image: updateProduct.image
    }).then(this.loadProducts)
  }


  render() {
    const { classes } = this.props;
    const { categories, products, productName, price, color, description, image, category, filteredProducts } = this.state;
    return (
      <div>
        <TextField
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          onChange={this.handleFilterChange('query')}
        />
       
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
                filteredProducts.map((product, index) => (
                  <ProductsTableRow
                    index={index}
                    product={product}
                    deleteProduct={this.deleteProduct}
                    updateProduct={this.updateProduct}
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
            select
            label="Select category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
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