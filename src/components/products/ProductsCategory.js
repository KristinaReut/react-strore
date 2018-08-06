import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({

    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 150,
    },
  
  });

class ProductsCategory extends Component {
    state = {
      category: "",
      categories: [],
      products: [],
    }
    
    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value
      });
    };
render() {
    const {classes, categories, products} = this.props;
   /* const renderCategories = products.filter(products  => products.category); */
  
    return (
 <TextField
 select
 label="Category-filter"
 className={classes.textField}
 onChange={this.handleChange('category')}
 value={this.state.category}
 SelectProps={{
   MenuProps: {
     className: classes.menu,
   },
 }}
 margin="normal"
 helperText="Please select category"
 >

 {categories.map(category => (
 <MenuItem key={category.id} value={category.name}>
 {category.name}
 </MenuItem>
))}
    </TextField> )
}}

ProductsCategory.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProductsCategory);