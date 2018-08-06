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



AllProducts.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AllProducts);