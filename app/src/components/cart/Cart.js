import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllCart, createOrder, deleteCart } from '../api';
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
    products: [],
    count: {},
    totalPrice: 0,
    allProducts: []
  }
  loadAllCart = () => {
    getAllCart().then(products => {
      this.setState({
        allProducts: products
      })
      const sortProducts = products.reduce((obj, key) => {
        obj[key.product.id] = (obj[key.product.id] || 0) + 1;
        return obj;
      }, {});
      this.setState({
        count: sortProducts
      });
      const newProducts = products.map(el => {
        return el.product
      })
      var uniqueProducts = []
      for (var i = 0; i < newProducts.length; i++) {
        for (var j = i + 1; j < newProducts.length; j++) {
          if (newProducts[i].id !== newProducts[j].id) {
            j++
          }
          else {
            i++
          }
        }
        uniqueProducts.push(newProducts[i])
      }
      this.setState({
        products: uniqueProducts
      })
      this.totalPrice()
    })
  };
  handleClickPlus = (id) => {
    this.setState(prevState => ({
      count: {
        ...prevState.count,
        [id]: this.state.count[id] += 1
      }
    }))
    setTimeout(
      () => this.totalPrice(),
      100
    );
  }
  handleClickMinus = (id) => {
    if (this.state.count[id] != 1) {
      this.setState(prevState => ({
        count: {
          ...prevState.count,
          [id]: this.state.count[id] -= 1
        }
      }))
      setTimeout(
        () => this.totalPrice(),
        100
      );
    }
  }
  totalPrice = () => {
    const products = this.state.products;
    const arr = products.map(product => {
      return (product.price * this.state.count[product.id])
    })
    var totalSum = 0
    for (var i = 0; i < arr.length; i++) {
      totalSum += arr[i]
    }
    this.setState({
      totalPrice: totalSum
    })
  }
  deleteFromCart = (id) => {
    const product = this.state.allProducts.find(el => {
      return (el.product.id === id)
    })
    const newId = product.id
    deleteCart(newId).then(this.loadAllCart())
  }




  handleSubmit = (id) => {
    const { products, count, totalPrice } = this.state;
    createOrder({
      products: products,
      count: count,
      totalPrice: totalPrice,
    })
  }
  componentDidMount() {
    this.loadAllCart()
    this.totalPrice()
  }



  render() {
    const { classes, product } = this.props;
    const { products, count, totalPrice } = this.state;
   
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
                    <CustomTableCell>{count[product.id]}</CustomTableCell>
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
                    <CustomTableCell numeric>{count[product.id] * product.price}$ </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <h1>Total price: {this.state.totalPrice} $</h1>
        <Button variant="contained" size="medium" color="primary" className={classes.button}
          onClick={() => this.handleSubmit(products, count, totalPrice)}>
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