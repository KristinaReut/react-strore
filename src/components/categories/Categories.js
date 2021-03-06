import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createCategory, getAllCategories, deleteCategory, updateCategory } from '../api';
import CategoriesTableRow from './CategoriesTableRow';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 110,
  },
  menu: {
    width: 200,
  },
  input: {
    display: 'none',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
 
    width: 145,
    height: 30,
    marginTop : 27
  },
});

class Categories extends Component {
  state = {
    name: "",
    categories: []
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  loadAllCategories = () => {
    getAllCategories().then(categories => {
      this.setState({ categories });
    });
  };

  componentDidMount() {
    this.loadAllCategories();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.trim().length > 0) {
      const { name } = this.state;
      this.setState({ name: "" });
      createCategory({ name }).then(this.loadAllCategories);
    }
  }
  deleteCategory = (id) => {
    deleteCategory(id).then(this.loadAllCategories)
  }
  updateCategory = (id, { name: data }) => {
    updateCategory(id, { name: data }).then(this.loadAllCategories)
  }


  render() {
    const { classes } = this.props;
    const { categories, name } = this.state;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
          <TextField
            label="Categories"
            className={classes.textField}
            margin="normal"
            value={name}
            onChange={this.handleChange('name')}
          />
          <Button disabled={this.state.disabled} variant="contained" color="primary" className={classes.button} type="submit" >
            Add Category
         </Button>
        </form>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Category</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                categories.map((category, index) => {
                  if (category.name.trim().length > 0) {
                    return (
                      <CategoriesTableRow
                        deleteCategory={this.deleteCategory}
                        updateCategory={this.updateCategory}
                        index={index}
                        category={category}
                      />)
                  }
                  else { return (null) }
                })
              }

            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);