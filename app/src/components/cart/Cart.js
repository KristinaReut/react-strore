import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllProducts, getAllCategories, getAllOrders } from '../api';
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
      width: '80%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
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
  
  
    class Cart extends Component {
      state = {
          products: [],
          categories: []
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
      this.loadAllProducts()  
        }
  handleSubmit = (e) => {
          e.preventDefault();
        }
  
  
      render() {
      const { classes } = this.props;   
      const { products } = this.state
        return (
          <div>
          <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Your order</CustomTableCell>
              <CustomTableCell>Count</CustomTableCell>
              <CustomTableCell></CustomTableCell>
              <CustomTableCell>Price</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => {
              return (
                <TableRow className={classes.row}>
                  <CustomTableCell component="th" scope="row">
                    {product.productName}
                  </CustomTableCell>
                  <CustomTableCell>Count</CustomTableCell>
                  <CustomTableCell>
                  <Button  color="primary" aria-label="Add" className={classes.button}>
                  Add
                  </Button>
                  <Button  color="secondary" aria-label="Add" className={classes.button}>
                  Delete
                   </Button>
                  </CustomTableCell>
                  <CustomTableCell numeric>{product.price}$ </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
       <h1>Total price: {}$</h1>
       <Button variant="contained" size="medium" color="primary" className={classes.button}>
          Order
        </Button>
       </div>
        );
      }
    }
  Cart.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    
    export default withStyles(styles)(Cart);