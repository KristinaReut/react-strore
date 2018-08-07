import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllProducts, getAllCategories, updatedProduct } from '../api';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  icon: {
    color: 'white',
  },
});


  class AllProducts extends Component {
    state = {
        products: [],
        categories: [],
        product: "",
      }
loadAllCategories = () => {
        getAllCategories().then(categories => {
          this.setState({ categories });
        });
      };
loadAllProducts = () => {
        getAllProducts().then(products => {
          this.setState({ products });
        });
      };
componentWillMount() {
    this.loadAllCategories();
    this.loadAllProducts();
      }
addProduct = () => {
        const {products} = this.state;
        const {product} = this.props.product;
        console.log(product)
      }

onUpdate = (id, data) => {
        updatedProduct(id, data).then(this.loadAllProducts);
      };


    render() {
    const { classes } = this.props;   
    const { products } = this.state
      return (
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell numeric>Price</CustomTableCell>
            <CustomTableCell numeric>Category</CustomTableCell>
            <CustomTableCell numeric>Description</CustomTableCell>
            <CustomTableCell numeric>Image</CustomTableCell>
            <CustomTableCell numeric>Color</CustomTableCell>
            <CustomTableCell numeric>Add to cart</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => {
            return (
              <TableRow className={classes.row}>
                <CustomTableCell component="th" scope="row">
                  {product.productName}
                </CustomTableCell>
                <CustomTableCell numeric>{product.price}$</CustomTableCell>
                <CustomTableCell numeric>{product.category}</CustomTableCell>
                <CustomTableCell numeric>{product.description}</CustomTableCell>
                <CustomTableCell numeric>{product.image}</CustomTableCell>
                <CustomTableCell numeric>{product.color}</CustomTableCell>
                <CustomTableCell numeric>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}
                onClick={this.addProduct}>
                          <AddIcon />
                 </Button>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
      );
    }
  }
AllProducts.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AllProducts);