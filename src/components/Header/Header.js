import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  AppBar: {
      background: '#91bb5a'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: '5px',
    color: '#fff'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  cartBtn: {
      background: '#45889c'
  },
  linkStyle: {
    textDecoration: 'none',
    color: '#fff'
  }
}));

function Header(props) {
  const classes = useStyles();

  // redirect to home
  function handleRedirect(){
    props.history.push('/checkout');
  }

  function filterOnEnterKey(e){
    const code = e.keyCode || e.which;
    if(code === 13) { //13 is the enter keycode
        props.getFilterResults();
    } 
  }

  const {onSearchChange, searchValue, getFilterResults} = props;
  return (
    <div className={classes.grow}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>
          <Link className={classes.linkStyle} to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              Grocery Store
            </Typography>
          </Link>
          <div className={classes.search}>
            <IconButton onClick={getFilterResults} type="submit" className={classes.searchIcon} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              onKeyPress={filterOnEnterKey}
              placeholder="Search…"
              value={searchValue}
              name={'searchValue'}
              onChange={onSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={props.totalSelectedItems} color="secondary">
                <Button
                  className={classes.cartBtn} 
                  variant="contained" 
                  startIcon={<ShoppingCart />} 
                  color="primary"
                  onClick={handleRedirect}
                >
                    {`${props.totalSelectedItems && props.totalSelectedItems*3} AED` || 0}
                </Button>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => {
  return {
      addedItems: state.shopReducer.addedItems,
      totalSelectedItems: state.shopReducer.totalSelectedItems,
  };
};

export default connect(mapStateToProps, null)(withRouter(Header));