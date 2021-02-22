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
  console.log(this.state)
  axios.post('http://localhost:3000/api/v1/auth/login', this.state).then(response=>{
    console.log(response)
    
  })
  .catch(error=>{
    console.log(error.response)
  })
}

render(){
  return (
    <div className="pagLogin">  

    <Container className="Login">
      <Row>
        <Col>
       
        <img src={mamsitter} className="im" alt="mamsitter" />
        
    </Col>
        <Col>
        <Form onSubmit={this.submitHandler} className="form">
        
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
        <Link to ="/cerca"> <button type="submit" class="button1 button2"  >Login</button></Link><br/> 
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

  /*<Form className="Login">
        <Row>

    <figure>
     <img src={mamsitter} className="im" alt="mamsitter" />
    </figure>
    
          <Col>
        <Form.Group controlId="formBasicEmail">
          <Form.Label><font face='Georgia'><h3>ACCEDI A MAMSITTER<br/> </h3></font></Form.Label>
            <font face='Georgia'><h5> Inserisci la tua e-mail</h5></font>
             <Form.Control name="email"  type="email" placeholder="Email" /><br/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <font face='Georgia'><h5>Inserisci la tua password </h5></font>
          <Form.Control name="password"  type="password" placeholder="Password" />
        </Form.Group></Col>
        </Row>
          <button type="button" class="btn btn-outline-white" onClick={login} >Login</button><br/> 
          <FacebookIcon></FacebookIcon><InstagramIcon></InstagramIcon>
          <br/><h6>Clicca <Link to ="/registrazione"> <font face='Georgia' color='black'><u>qui</u> </font></Link> per registrarti</h6>
      </Form>*/