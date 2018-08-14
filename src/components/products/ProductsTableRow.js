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
});


class ProductsTableRow extends Component {
  state = {
    checked: false,
  }
  deleteProduct = (id) => {
    const { deleteProduct } = this.props
    deleteProduct(id)
  }
  updateProduct = (id, data) => {
    const { updateProduct } = this.props
    updateProduct(id, data)
  }



  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
    setTimeout(() => {
      const data = this.state.checked;
      const { checkedProduct, product } = this.props
      checkedProduct(product.id, data)
    }, 300)
  };

  render() {
    const { product } = this.props;
    const { index } = this.props;
    return (
      <TableRow>
        <TableCell component="th" scope="row">{index + 1}</TableCell>
        <TableCell numeric>{product.productName}</TableCell>
        <TableCell numeric>{product.price}$</TableCell>
        <TableCell numeric>{product.description}</TableCell>
        <TableCell numeric>{product.category}</TableCell>
        <TableCell numeric>{product.image}</TableCell>
        <TableCell numeric>{product.color}</TableCell>
        <TableCell numeric>
          <ProductsDelete id={product.id} deleteProduct={this.deleteProduct} />
          <ProductsEdit product={product} updateProduct={this.updateProduct} loadAllProducts={this.loadAllProducts} />
        </TableCell>
        <TableCell numeric> <Checkbox
          checked={this.state.checked}
          onClick={this.handleChange("checked")}
          value="featured"
        /> </TableCell>
      </TableRow>

    )
  }
}

ProductsTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsTableRow);