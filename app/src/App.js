import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AllProducts from './components/allProducts/AllProducts';
import Cart from './components/cart/Cart';


const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {

  state = {
    products: [],
  };

  addProductInCart = (product) => {
    const products = this.state.products
    const index = this.state.products.findIndex(el => el.id === product[0].id)
    if (index === -1) {
      this.state.products.push(product[0])
      setTimeout(() => {
        const index = this.state.products.findIndex(el => el.id === product[0].id)
        this.state.products[index].count++
      }, 300)
    } else {
      this.state.products[index].count++
    }
  }

  handleClickPlus = (id) => {
    const products = this.state.products
    const index = this.state.products.findIndex(el => el.id === id)
    this.state.products[index].count++
    this.setState({ products })
  }
 
  handleClickMinus = (id) => {
    const products = this.state.products
    console.log(products)
    const index = this.state.products.findIndex(el => el.id === id)
    if (this.state.products[index].count != 1)
   { this.state.products[index].count--
    this.setState({ products }) }
  }
 
  deleteFromCart = (id) => {
    const products = this.state.products
    
    const index = this.state.products.findIndex(el => el.id === id)
    this.state.products[index]
    this.setState({ products })
  }

  
  AllProducts = props => (
    <AllProducts {...props} addProductInCart={this.addProductInCart} />
  );
  Cart = props => (
    <Cart {...props} products={this.state.products} handleClickPlus={this.handleClickPlus} handleClickMinus={this.handleClickMinus} deleteFromCart={this.deleteFromCart} />
  );

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                E-commerce
          </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <List component="nav">
              <ListItem button component={props => <Link to="/" {...props} />}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText>All Products</ListItemText>
              </ListItem>
              <ListItem button component={props => <Link to="/cart" {...props} />}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText>Cart</ListItemText>
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={this.AllProducts} />
              <Route path="/cart" component={this.Cart} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);