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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';




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


class Cart extends Component {
  state = {
    totalPrice: 0,
    open: false,
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
  updateCart = () => {
    const { updateCart } = this.props
    updateCart()
    this.setState({totalPrice: 0})
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
    if (totalPrice != 0) {
    createOrder({
      products: products,
      totalPrice: totalPrice,
    }).then(this.openDialog)
    
  } 
  const {cleanState} = this.props
}

  componentDidMount() {
    this.totalPrice()
  }

  

  render() {
    const { classes, products } = this.props;
    const { totalPrice } = this.state;
  
    
      
{if (this.state.totalPrice <= 0) {
  return (
    <h3>Your cart is empty now. Please, add products.</h3>
  ) 
  }
}

return (
  <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Your order</CustomTableCell>
            <CustomTableCell>Price</CustomTableCell>
            <CustomTableCell>Quantity of product</CustomTableCell>
            <CustomTableCell>Total price</CustomTableCell>
            <CustomTableCell>Delete</CustomTableCell>
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
                </CustomTableCell>
                <CustomTableCell>{product.price}$</CustomTableCell>
                <CustomTableCell>
                 
                  <Button color="primary" className={classes.button} onClick={() => this.handleClickPlus(product.id)}>
                    +
              </Button>
              {product.count}
                  <Button color="secondary" className={classes.button} onClick={() => this.handleClickMinus(product.id)}>
                    -
               </Button>
               
               </CustomTableCell>
               
               <CustomTableCell>{product.count * product.price}$ </CustomTableCell>
               <CustomTableCell>
                  <Button variant="contained" color="secondary" className={classes.button} type="submit"
                    onClick={() => this.deleteFromCart(product.id)}
                  >Delete</Button>
              </CustomTableCell>
              
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    <h3>Total price: {this.state.totalPrice} $ <Button variant="contained"  color="primary" className={classes.button}
      onClick={() => this.handleAddOrder(totalPrice)}>
      Submit
    </Button></h3>
    <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
     
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Your order is accepted
       </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.updateCart()} color="primary">
          Ok
       </Button>
      </DialogActions>
    </Dialog>

    
  </div>
);
}
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);