import React, { Component } from 'react';




class Products extends Component {
    state = {
    }
    
render() {
    const {classes} = this.props;
    const { products, productName, price, color, description, image, categories} = this.state;
    return (
        <form className={classes.container} noValidate autoComplete="off" >
        <TextField
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        /> 
        </form>)
    }
    }

    
ProductsSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsSearch);