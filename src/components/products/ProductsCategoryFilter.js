import React, { Component } from 'react';




class ProductsCategoryFilter extends Component {
    state = {
    }

    render() {
       ( <form>
           <TextField
          select
          label="Category-filter"
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select category"
          margin="normal"
        />
          </form>)
        }
        }
        
Products.propTypes = {
    classes: PropTypes.object.isRequired,
          };
          
export default withStyles(styles)(ProductsCategoryFilter); 
          
    