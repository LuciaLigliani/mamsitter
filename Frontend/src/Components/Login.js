import React from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import mamsitter from '..//mamsitter.png';
import Navbar from '..//Components/Navbar'
import util from '..//util/util'

import { Col, Row } from 'react-bootstrap';
import { Component } from 'react';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:''
    }
  }
  

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
submitHandler = (e) => {
  e.preventDefault()
  console.log('1');
  axios.post('/api/v1/auth/login', this.state).then(response=>{
    console.log('2');
  if(response.data.status === 'success') {
    console.log('3');
    let jwt =  response.data.token;
    console.log(jwt);
    util.setCookie("user_jwt",jwt,7);
    alert('ok');
    /*setTimeout(()=> {
    window.location.assign('/blog');
     }, 10);*/
  }
  console.log('4');
  })
  .catch(error=>{
    console.log(error);
    alert(error.response.data.message);
  })
}



render(){
  return ( 
    <div className="pagLogin">  
  <Navbar/>
    <Container className="Login">
      <Row>
        <Col>
       
        <img src={mamsitter} className="im" alt="mamsitter" />
        
    </Col>
        <Col>
        <Form onSubmit={this.submitHandler}  className="form">
        
        <br/> <Form.Label><font face='Georgia'><h3>ACCEDI A MAMSITTER </h3></font></Form.Label><br/><br/>
         <Form.Group controlId="formBasicEmail">   
         <font face='Georgia'><h5> Inserisci la tua e-mail</h5></font>
             <Form.Control required name='email'  type="email" placeholder="Email" onChange={this.changeHandler} /><br/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
        <br/> <font face='Georgia'><h5>Inserisci la tua password </h5></font> 
          <Form.Control required name='password'  type="password" placeholder="Password" onChange={this.changeHandler} />
        </Form.Group>
        <br/><br/>
         <button type="submit" class="button1 button2"  >Login</button><br/> 
        <br/><FacebookIcon></FacebookIcon><InstagramIcon></InstagramIcon>
        <br/> <br/><h6>Clicca <Link to ="/signup"> <font face='Georgia' color='black'><u>qui</u> </font></Link> per registrarti</h6></Form>
      </Col>
      </Row>
    </Container>
    

    </div>
  ); 
}
}
export default Home;

