import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

  class ProductsEdit extends Component {
    state = {
      product: '',
      products: [],
      open: false,
    }
    handleClose = () => {
      this.setState({
        open: false
      })
    }
  
    openDialog = () => {
      this.setState({
        open: true
      })
    }
    componentDidMount() {
      this.setState({
        productName: this.props.product.productName,
        price: this.props.product.price,
        color: this.props.product.color,
        image: this.props.product.image,
        description: this.props.product.description,
      })
    }
    handleChange = (productName, price, color, description, image) => (event) => {
      this.setState({
        [productName]: event.target.value,
        [price]: event.target.value,
        [color]: event.target.value,
        [description]: event.target.value,
        [image]: event.target.value,
      });
    };
   
    updateProduct = () => {
      const { updateProduct } = this.props
      const product = this.props.product
      const id = product.id;
      const data = this.state.product;
      updateProduct(id, { name: data });
      this.handleClose()
      console.log(product)
    }

    render() {
      const { classes, product } = this.props;

        return (  
          <div>
            <Button variant="contained" color="primary" className={classes.button} type="submit"  products={this.state.products}
            onClick={this.openDialog}>
            Edit
            </Button>

         <Dialog
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
        
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Edit
          </DialogContentText>
           <TextField
             label="Name"
             margin="normal"
             value={this.props.product.productName}
             onChange={this.handleChange('productName')}
           />
           <TextField
             label="Price"
             margin="normal"
             type="number"
             value={this.props.product.price}
             onChange={this.handleChange('price')}
           />
           <TextField
             label="Description"
             margin="normal"
             value={this.props.product.description}
             onChange={this.handleChange('description')}
           />
           <TextField
             label="Category"
             margin="normal"
             value={"sdds"}
             onChange={this.handleChange('category')}
           />
           <TextField
             label="Color"
             margin="normal"
             value={this.props.product.color}
             onChange={this.handleChange('color')}
           />
             <TextField
             label="Image"
             margin="normal"
             value={this.props.product.image}
             onChange={this.handleChange('image')}
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             Disagree
          </Button>
           <Button onClick={this.updateProduct} color="primary" autoFocus>
             Agree
          </Button>
         </DialogActions>
       </Dialog>
     </div>
         )
    }
}

ProductsEdit.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProductsEdit);

          
          