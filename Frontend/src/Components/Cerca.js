import React from 'react';
//import Navbar from '..//Components/Navbar';
import '..//App.css';
import Grid from '..//Components/Grid';
import milano from '..//milano.jpeg';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import PlaceIcon from '@material-ui/icons/Place';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';

import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
  },
}));

function Cerca(){

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div >
      
      <ul className="linksNav">
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
          </Link>
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black'>BLOG</font></li>
          </Link>
          
          <Link to="/aboutUs">
            <li><font face='Georgia' color='black'>DICONO DI NOI</font></li>
          </Link>
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}  > <AccountCircle/>
            <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            <Link to="/login"><MenuItem  onClick={handleClose}>Login</MenuItem></Link> 
            <Link to="/signup"> <MenuItem onClick={handleClose}>Registrazione</MenuItem></Link>
          </Menu>
        </ul>
     <div className="cerca">
     <h3><b><font face='Georgia' color='black'>Cerca la babysitter giusta per te!</font></b></h3 >
     <Form><Row>
       <Col>

       <FormControl className={classes.margin}>
       
        
        <InputLabel htmlFor="input-with-icon-adornment">Scegli la città</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <PlaceIcon />
            </InputAdornment>
          }
        />
        </FormControl>
       </Col>
     </Row>
     <Row>
       <Col>
          <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Scegli il distretto</InputLabel>
        <Input
          id="input-with-icon-adornment"

          startAdornment={
            <InputAdornment position="start">
              <PlaceOutlinedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
       </Col>
     </Row>
     <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true">Cerca</Button>
        
      </Form>
    <figure>
     <img src={milano} className="imgg" alt="milano" />
    </figure>
    
    <Grid/>
     </div>

      
    </div>

  )
}

export default Cerca;