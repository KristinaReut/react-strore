import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';


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
    const { classes } = this.props;
    const {product}=this.props;
    const {index}=this.props;
  
    
    console.log(category);
      return (  
                <TableRow>
                <TableCell component="th" scope="row">{index +1}</TableCell>
                <TableCell numeric>{product.name}</TableCell>
                <TableCell numeric>{product.price}</TableCell>
                <TableCell numeric>{product.description}</TableCell>
                <TableCell numeric>{category.name}</TableCell>
                <TableCell numeric>{product.image}</TableCell>
                <TableCell numeric>{product.color}</TableCell>
                <TableCell numeric>
                <Button variant="contained" color="secondary" className={classes.button} type="submit" onClick={this.onClickDelete}>
                 Delete
                 </Button>
                 <Button variant="contained" color="primary" className={classes.button} type="submit">
                 Edit
                 </Button>
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