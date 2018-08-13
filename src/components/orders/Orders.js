import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrdersTableRow from './OrdersTableRow';
import { getAllOrders } from '../api';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Orders extends Component {
  state = {
    orders: [],
    count: [],
    products: [],
    totalPrice: ""
  }
  loadAllOrders = () => {
    getAllOrders().then(orders => {
      this.setState({ orders});
    });
   
  };
  componentDidMount() {
    this.loadAllOrders();
  }
    render() {
      const {classes} = this.props;
      const { orders } = this.state;

      return (

           <div>
             <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
                orders.map((order, index) => {
                    return (
                      <OrdersTableRow
                        index={index}
                        order={order}
                      />)
                })
              }
        </TableBody>
      </Table>
    </Paper>
          </div>
      );
    }
  }
  


Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Orders);