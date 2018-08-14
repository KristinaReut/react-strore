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
    orders: []
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
      const {  index, order } = this.props;
      const { orders } = this.state;
      
        return (
            <TableRow>
            <TableCell component="th" scope="row">
            {index + 1}
            </TableCell>
            <TableCell>
            {order.products.map((product, index) => {
            return (
              <ul style={{display: "inline-block"}}>
              <li style={{listStyle: "none"}} >
              
            <h3>{index + 1}.{order.products[index].productName}</h3>
            <br />
            Category - {order.products[index].category}
            <br />
            Price - {order.products[index].price} $
            <br />
            Color - {order.products[index].color}
            <br />
            Count  - {order.products[index].count}
            <br />
            Total price - {order.products[index].count*order.products[index].price} $
            
            </li>
            </ul>
            )
            })
            }
            </TableCell>
            <TableCell>{order.totalPrice}$</TableCell>
          </TableRow>
        )
    }
}

OrdersTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OrdersTableRow);