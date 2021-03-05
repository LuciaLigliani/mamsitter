import React from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle';

import axios from 'axios';
import util from '..//util/util'

/*
class Blog extends Component{
constructor(props){
  super(props)
  this.state = {
    email:'dd',
    role:'',
    name:'',
    surname:'',
    sex:'',
    birthDate:'',
    city:'',
    district:'',
    description:'',
    phoneNumber:''
  }
}

handleClick = (event) => {
  this.setState({anchorEl:event.currentTarget});
}
handleClose = () => {
  this.setState({anchorEl:null});
};

changeHandler = (e) => {
  this.setState({[e.target.name]:e.target.value})
}

setData = (data, specificData) => {
  this.email= data.email;
  this.role = data.role;
  this.name = specificData.name;
  this.surname = specificData.surname;
  this.sex = specificData.sex;
  this.birthDate = specificData.birthDate;
  this.city = specificData.city;
  this.district = specificData.district;
  this.description = specificData.description;
  this.phoneNumber = specificData.phoneNumber;
}

 
submitHandler = (e) => {
e.preventDefault()
axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
axios.get('http://localhost:3000/api/v1/users/myProfile', this.state).then(response=>{
  let specificData;
      if(response.data.data.role === 'famiglia') specificData = response.data.data.famiglia_id;
      if(response.data.data.role === 'babysitter') specificData = response.data.data.babysitter_id;
      if(response.data.data.role === 'badante') specificData = response.data.data.badante_id;
      if(response.data.data.role === 'colf') specificData = response.data.data.colf_id;

      this.setData(response.data.data , specificData);

if(response.data.status === 'success') {
  alert('ok');
  setTimeout(()=> {
  window.location.assign('/myProfile');
   }, 10);
}
})
.catch(error=>{
  alert(error.response.data.message);
})
}

render(){
  console.log(this.props.email);

  return(
    <div className="App">
    <div className="Navbar">
  <Link to="/home"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
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
    <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}> <AccountCircle/>
        <ArrowDropDownIcon></ArrowDropDownIcon>
    </Button>
      <Menu 
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
    <MenuItem onClick={this.submitHandler}>Visualizza profilo</MenuItem>
        <Link to="/signup"> 
        <MenuItem onClick={this.handleClose}>Passa a profilo premium</MenuItem></Link>
        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        
      </Menu>
    </ul>
  </div>
  </div>

  );
}
}


export default Blog;

*/



const Blog = () => {
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //let info;
  const getProfile = () => {
    const url = 'http://localhost:3000/api/v1/users/myProfile';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get(url)
    .then((profile)=>{
     // info=profile.data.data;

    })
    .catch((err)=> alert(err));


  }
  //console.log(info);
  
    return (
      

      <div className="App">
        <div className="Navbar">
      <Link to="/home"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
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
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> <AccountCircle/>
            <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
           <Link to="/myProfile"><MenuItem onClick={()=>getProfile()}>Visualizza profilo</MenuItem></Link> 
            <Link to="/signup"> <MenuItem onClick={handleClose}>Passa a profilo premium</MenuItem></Link>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            
          </Menu>
        </ul>
      </div>
      </div>

    );
  }

export default Blog;