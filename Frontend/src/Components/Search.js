import React from  'react';
import '..//App.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logomodi from '..//logomodi.png';
import axios from 'axios';
import util from '..//util/util'
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Component } from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      anchorEl:'',
      city:'',
      district: '',
      ageMax:'',
      ageMin:'',
      sex:'',
      role:'',
      regular:'',
      occasional:'',
      diurnal:'',
      nocturnal:'',
      allDay:'',
      atHour:''
    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };


  calculateAge(birthday) { 
    const todayYear = new Date().getFullYear();
    const dob = new Date(birthday).getFullYear();
    return todayYear - dob;

  }

  changeHandler = (e) => {
  if(['regular', 'occasional', 'diurnal', 'nocturnal', 'atHour', 'allDay'].includes(e.target.name))
  this.setState({[e.target.name]:e.target.checked});
  else this.setState({[e.target.name]:e.target.value})
  }

  createQuery () {
    let filter = '';
    const todayYear = new Date().getFullYear();
      if(this.state.city) filter = (filter || '?') + 'city='+this.state.city+'&';
      if(this.state.ageMax) {
        const year = todayYear-this.state.ageMax;
        const maxDate= year + '-01-01';
        filter = (filter || '?') + 'birthDate[gte]='+maxDate+'&';
      }
      if(this.state.ageMin) {
        const year = todayYear-this.state.ageMin;
        const minDate= year + '-01-01';
        filter = (filter || '?') + 'birthDate[lte]='+minDate+'&';
      }
      if(this.state.sex) filter = (filter || '?') + 'sex='+this.state.sex+'&';
      if(this.state.role) filter = (filter || '?') + 'role='+this.state.role+'&';
      if(this.state.regular) filter = (filter || '?') + 'regular='+this.state.regular+'&';
      if(this.state.occasional) filter = (filter || '?') + 'occasional='+this.state.occasional+'&';
      if(this.state.district) filter = (filter || '?') + 'district='+this.state.district+'&';
      if(this.state.diurnal) filter = (filter || '?') + 'diurnal='+this.state.diurnal+'&';
      if(this.state.nocturnal) filter = (filter || '?') + 'nocturnal='+this.state.nocturnal+'&';
      if(this.state.allDay) filter = (filter || '?') + 'allDay='+this.state.allDay+'&';
      if(this.state.atHour) filter = (filter || '?') + 'atHour='+this.state.atHour+'&';

      return filter;
  }
  
  async componentDidMount(){
    let vetrina =[];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url='http://localhost:3000/api/v1/users';
    axios.get(url).then(response=>{
    this.setState({users: response.data.data});
    response.data.data.map((user) => {
      if(user.generalUser.highlighted === true) vetrina.push(user);
    
      return vetrina

    });
    this.setState({highlighted: this.grid(vetrina)});
    console.log(vetrina);
  })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const query = this.createQuery();
    const url = 'http://localhost:3000/api/v1/users' + query;
    axios.get(url).then(response=>{
      console.log(url);
      this.setState({users: response.data.data});
      
    })
    .catch(error=>{
      console.log(error);
    })
  }
  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

 grid (vetrina) {
  return(
    <div className="root">
      <h4><font face='Times New Roman' color='black'>Vetrina</font></h4>
      <GridList className="gridList" cols={5}>
        {vetrina.map((user) => (
          <GridListTile key={user.generalUser.photo}>
           <Link to="/myProfile"> <img src={user.generalUser.photo} alt=''  /> </Link>
            <GridListTileBar
            className="titleBar title" 
              title={user.specificUser.name}
            />
          </GridListTile>
        ))}
      </GridList>
    </div> 
  );
}
  
 
  render() {
    return (  
      <div className="cerca">
        
      <Link to="/home"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
            <ul className="linksNav">
                <Link to="/mamsitter">
                  <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
                </Link>
                <Link to="/mamsitter">
                  <li><font face='Georgia' color='black'>BLOG</font></li>
                </Link>
                
                <Link to="/aboutUs">
                  <li><font face='Georgia' color='black'>LA NOSTRA STORIA</font></li>
                </Link>
              <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  > <AccountCircle fontSize='large'/>
                  <ArrowDropDownIcon></ArrowDropDownIcon>
              </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                  <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
                  <Link to="/home">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link> 
                </Menu>
                 
              </ul>
      
      <Col>
        <Form onSubmit={this.submitHandler}  className="formm"> 
        <br/>
        <h3><font face='Georgia' color='black'>Cerca il lavoratore più adatto alle tue esigenze!</font> </h3>
          <Row>
            <Col sm={5}> 
            <br/><Form.Control style={{marginLeft:100}} name='city' as="select" defaultValue="Città" onChange={this.changeHandler} > 
               <option value  hidden="hidden"  >Città</option>
               <option>Milano</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='district' as="select" defaultValue="Distretto" onChange={this.changeHandler} > 
               <option value  hidden="hidden"  >Distretto</option>
               <option>district1</option> 
               <option>district2</option> 
               <option>district3</option> 
            </Form.Control><br/>
              <Form.Control style={{marginLeft:100}} name='ageMax' placeHolder="Inserisci età minima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='ageMin' placeHolder="Inserisci età massima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='sex' as="select" defaultValue="Sesso" onChange={this.changeHandler} > <br/>
               <option value  hidden="hidden"  >Sesso</option>
               <option>Maschio</option> 
               <option>Femmina</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='role' as="select" defaultValue="Ruolo" onChange={this.changeHandler} > 
               <option value  hidden="hidden"  >Ruolo</option>
               <option>Babysitter</option> 
               <option>Colf</option> 
               <option>Badante</option> 
            </Form.Control><br/>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label style={{marginLeft:90}} as="legend" column sm={9}>
             <br/> <font face='Georgia' color="black"><h5>  Tipologia di lavoro</h5></font>  
              </Form.Label>
             <Col sm={9}>
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Occasionale"
              name='occasional'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Regolare"
              name='regular'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Giornaliero"
              name='diurnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="A ora"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Al giorno"
              name='allDay'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Notturno"
              name='nocturnal'
              id="formHorizontalRadios3"
            />
          </Col>
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
          <button type="submit" class="button1 button2" style={{marginLeft:80}} >Cerca</button>
          </Col>
          </Row>
        </Form>
    </Col>
    <Col>
    
    <iframe title="mamsitter" src="https://www.google.com/maps/d/u/0/embed?mid=1ETRb4lxy5gvfF2m--GB1cOAJNCdmSRfs"  style={{marginLeft:650,  width:450, height:380, marginTop:-1000, marginBottom:40}} loading="lazy" ></iframe>
     </Col>
              
              
     {this.state.highlighted}
      
          <div className="card_container">
           
            {this.state.users.map(users=>(
              <div key={users.generalUser.id}>
             <div className="card">
               <div className="card_title">
               {users.specificUser.name} {users.specificUser.surname} 
               </div> 
               <div className="card_body">
              <img src={users.generalUser.photo} alt=''></img>
              
               {this.calculateAge(users.specificUser.birthDate)} <br/>
               {users.specificUser.city} <br/>
               {users.specificUser.role}
              <Link to="/myProfile"> <button class="button1 button2" >Visualizza Profilo</button></Link>
               </div> 
              </div>
              </div>
            ))}
            

            </div>
      
      
    
      
     
      
      </div>
      );
  }


}
 export default Search;

 