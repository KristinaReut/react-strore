import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createOrder } from '../api';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { throws } from 'assert';


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
    fontSize: 20,
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
    totalPrice: 0,
  }

  handleClickPlus = (id) => {
    const { handleClickPlus } = this.props
    handleClickPlus(id)
    this.totalPrice()
  }

  handleClickMinus = (id) => {
    const { handleClickMinus } = this.props
    handleClickMinus(id)
    this.totalPrice()
  }
  deleteFromCart = (id) => {
    const { deleteFromCart } = this.props
    deleteFromCart(id)
    this.totalPrice()
  }
  totalPrice = () => {
    const products = this.props.products
    const arr = products.map(product => {
      return (product.price * product.count)
    })
    var totalSum = 0
    for (var i = 0; i < arr.length; i++) {
      totalSum += arr[i]
    }
    this.setState({
      totalPrice: totalSum
    })
  }

  handleAddOrder = () => {
    const totalPrice = this.state.totalPrice;
    const products = this.props.products;
    console.log(products)
    createOrder({
      products: products,
      totalPrice: totalPrice,
    })
  }

  componentDidMount() {
    this.totalPrice()
  }



  render() {
    const { classes, products } = this.props;
    const { totalPrice } = this.state;
    console.log(totalPrice);
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
                      <h2>{product.productName}</h2>
                      <br />
                      category - {product.category}
                      <br />
                      color - {product.color}
                      <br />
                      description- {product.description}
                    </CustomTableCell>
                    <CustomTableCell>{product.count}</CustomTableCell>
                    <CustomTableCell>
                      <Button color="primary" className={classes.button} onClick={() => this.handleClickPlus(product.id)}>
                        +
                  </Button>
                      <Button color="secondary" className={classes.button} onClick={() => this.handleClickMinus(product.id)}>
                        -
                   </Button>
                      <Button variant="contained" color="secondary" className={classes.button} type="submit"
                        onClick={() => this.deleteFromCart(product.id)}
                      >Delete</Button>
                    </CustomTableCell>
                    <CustomTableCell numeric>{product.count * product.price}$ </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <h1>Total price: {this.state.totalPrice} $</h1>
        <Button variant="contained" size="medium" color="primary" className={classes.button}
          onClick={() => this.handleAddOrder(totalPrice)}>
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