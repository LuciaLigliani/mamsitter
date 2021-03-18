import React from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import mamsitter from '..//mamsitter.png';
import Navbar from '..//Components/Navbar'
import util from '..//util/util'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Col, Row } from 'react-bootstrap';
import { Component } from 'react';
import { Snackbar } from '@material-ui/core';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',
      open: false,
      message:''
    }
    
  }


  handleClose= (e) => {
   this.setState({open:false})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
submitHandler = (e) => {
  e.preventDefault()
  axios.post('/api/v1/auth/login', this.state).then(response=>{
  if(response.data.status === 'success') {
    let jwt =  response.data.token;
    util.setCookie("user_jwt",jwt,7);
    this.setState({open:true, message:'Login effettuato'})
    setTimeout(()=> {
    window.location.assign('/search');
     }, 10);
  }
  })
  .catch(error=>{
  if(error.response.data.message === 'Incorrect email or password')
    this.setState({open:true, message:'Email o password incorretti'});
  })
}



render(){
  
    return ( 
      <div>
        <Snackbar className="snackbar"
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center'
  }}
  open={this.state.open}
  autoHideDuration={3000}
  onClose={this.handleClose}
  message = {<span id="message-id">{this.state.message}</span>}
  action={
    <IconButton onClick={this.handleClose}>
      <CloseIcon/>
    </IconButton>
  }
  />
      
    <div className="pagLogin">  
    
  <Navbar/>
    <Container className="Login">
      <Row>
        <Col>
       
        <img src={mamsitter} className="im" alt="mamsitter" />
        
    </Col>
        <Col>
        <Form onSubmit={this.submitHandler}  className="form">
        
        <br/> <Form.Label><font face='Georgia'><h3>ACCEDI A MAMSITTER </h3></font></Form.Label><br/><br/><br/>
         <Form.Group controlId="formBasicEmail">   
         <font face='Georgia'><h5> Inserisci la tua e-mail</h5></font>
             <Form.Control required name='email'  type="email" placeholder="Email" onChange={this.changeHandler} /><br/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
        <br/>  <br/> <font face='Georgia'><h5>Inserisci la tua password </h5></font> 
          <Form.Control required name='password'  type="password" placeholder="Password" onChange={this.changeHandler} />
        </Form.Group>
        <br/><br/><br/>
         <button onClick={()=>this.state.open} class="button1 button2"  >Login</button><br/><br/>
        <br/>
       <h6>Clicca <Link to ="/signup"> <font face='Georgia' color='black'><u>qui</u> </font></Link> per registrarti</h6></Form>
      </Col>
      </Row>
     
    </Container>
    

    </div>
    </div>
  ); 
}
}
export default Home;

