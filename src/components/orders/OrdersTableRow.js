import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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


class OrdersTableRow extends Component {
  state = {
    order: [],
    }
    
  

    render() {
      const {  index, order } = this.props;
      console.log(order)
        return (
            <TableRow>
            <TableCell component="th" scope="row">
            {index + 1}
            </TableCell>
            <TableCell> 
            {order.id}
            </TableCell>
            <TableCell numeric>Name of Product - {order.products.productName}
            <br />
            Category -
            <br />
            Color -
            <br />
            Image -
            <br />
            Count -
            </TableCell>
            <TableCell numeric>{order.totalPrice}$</TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        )
    }
}

OrdersTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OrdersTableRow);