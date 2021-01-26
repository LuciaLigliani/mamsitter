import React from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logo from '..//logo.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div className="Navbar">
      <Link to="/home"><img src={logo} className="navbarLogo" alt="logo"/></Link>
        <ul className="linksNav">
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
          </Link>
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black'>BLOG</font></li>
          </Link>
          <Link to="/cerca">
            <li><font face='Georgia' color='black'>CERCA NELLE VICINANZE</font></li>
          </Link>
          <Link to="/aboutUs">
            <li><font face='Georgia' color='black'>DICONO DI NOI</font></li>
          </Link>
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> 
            <font face='Georgia'>Come funziona</font> <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </ul>
    </div>
  )
}
export default Navbar;
