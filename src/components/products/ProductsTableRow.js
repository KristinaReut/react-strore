import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ProductsDelete from './ProductsDelete'
import ProductsEdit from './ProductsEdit'


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  root: {
    width: '40%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class ProductsTableRow extends Component {

  render() {
    const {product}=this.props;
    const {index}=this.props;
    console.log(product);
    
      return (  
                <TableRow>
                <TableCell component="th" scope="row">{index +1}</TableCell>
                <TableCell numeric>{product.product}</TableCell>
                <TableCell numeric>{product.price}</TableCell>
                <TableCell numeric>{product.description}</TableCell>
                <TableCell numeric>{product.category}</TableCell>
                <TableCell numeric>{product.image}</TableCell>
                <TableCell numeric>{product.color}</TableCell>
                <TableCell numeric>
                <ProductsDelete />
                <ProductsEdit />
                </TableCell>
                <TableCell numeric> <Checkbox  value="checkedD" /> </TableCell>
              </TableRow>

              )
             }
}

 ProductsTableRow.propTypes = {
     classes: PropTypes.object.isRequired,
    };
              
export default withStyles(styles)(ProductsTableRow);