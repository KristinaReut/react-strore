import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllCart } from '../api';
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
    fontSize: 30,
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
  }
  loadAllCart = () => {
    getAllCart().then(products => {
      
      this.setState({ products });
    });

  };

  componentWillMount() {
    this.loadAllCart()
  }


  render() {
    const { classes, } = this.props;
    const { products } = this.state;
    // console.log(products)
    const count = 1;
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
                      <h2>{product.product.productName}</h2>
                      <br />
                      category - {product.product.category}
                      <br />
                      color - {product.product.color}
                      <br />
                      description- {product.product.description}
                    </CustomTableCell>
                    <CustomTableCell>{count}</CustomTableCell>
                    <CustomTableCell>
                      <Button color="primary" className={classes.button} onClick={count + 1}>
                        +
                  </Button>
                      <Button color="secondary" className={classes.button} onClick={count + 1}>
                        -
                   </Button>
                    </CustomTableCell>
                    <CustomTableCell numeric>{count * product.product.price}$ </CustomTableCell>
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