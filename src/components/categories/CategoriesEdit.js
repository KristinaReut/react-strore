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

class CategoriesEdit extends Component {
  state = {
    category: '',
    categories: [],
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
      category: this.props.category.name
    })
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
 
  updateCategory = () => {
    const { updateCategory } = this.props
    const category = this.props.category
    const id = category.id;
    const data = this.state.category;
    updateCategory(id, { name: data });
    this.handleClose()
  }
  render() {
    const { classes, category } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button} type="submit" categories={this.state.categories}
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
              label="Categories"
              margin="normal"
              value={this.state.category}
              onChange={this.handleChange('category')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
           </Button>
            <Button onClick={this.updateCategory} color="primary" autoFocus>
              Agree
           </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

CategoriesEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesEdit);


