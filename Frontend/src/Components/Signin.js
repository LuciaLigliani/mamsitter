import React from 'react';
import '..//App.css';

import {Link} from 'react-router-dom';
import { Component } from 'react';
import mamsitter from '..//mamsitter.png';
import { Col, Row } from 'react-bootstrap';
import { FormLabel } from '@material-ui/core';

import Form from 'react-bootstrap/Form'

import Container from 'react-bootstrap/Container'
import axios from 'axios'
class Signin extends Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      role:'',
      passwordConfirm:'',
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
  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
submitHandler = (e) => {
  e.preventDefault()
  console.log(this.state)
  axios.post('http://localhost:3000/api/v1/auth/signup', this.state).then(response=>{
    console.log(response)
    
  })
  .catch(error=>{
    console.log(error.response)
  })
}
  render(){
  return (
    <div className="pagSignin">
      <Container className="Signin">
        <Form onSubmit={this.submitHandler}  className="formS">
        <Row> 
          <FormLabel>
          <font face='Georgia' color='black'><h4>Compila il modulo per la registrazione</h4></font><br/>
          </FormLabel> 
          <Col>
          <img src={mamsitter} className="im" alt="mamsitter" />
          </Col>
          <Col>
          <Form.Group controlId="formBasicEmail"> 
            <br/> <Form.Control required name='email'  type="email" placeholder="Email" onChange={this.changeHandler} /><br/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Control required name='password'  type="password" placeholder="Password" onChange={this.changeHandler} />
          </Form.Group>
         <br/><br/> <Form.Control required placeholder="Nome" name='name' onChange={this.changeHandler}  />
        <br/><br/> <Form.Control required name='sex' as="select">
         <option value  hidden="hidden" onChange={this.changeHandler} >Sesso</option>
         <option value="m">M</option>
         <option value="f">F</option> 
          </Form.Control>
          <br/> <br/><Form.Control required as="select" name='city'onChange={this.changeHandler}  >
           <option value hidden="hidden">Città</option>
           <option>Milano</option>
           </Form.Control>
           <br/> <br/> <Form.Control required placeholder="Descrizione" name='description 'onChange={this.changeHandler}   />

          </Col> 
          <Col>
        <br/> <Form.Control required name='role' as="select" defaultValue="Scegli ruolo" onChange={this.changeHandler} > 
        <option>Scegli ruolo</option>
        <option value="famiglia">Famiglia</option>
        <option value="babysitter">Babysitter</option>
        <option>Badante</option>
        <option>Colf</option>
      </Form.Control>
      <Form.Group controlId="formPassword">
         <br/> <Form.Control required name='passwordConfirm'  type="password" placeholder="Conferma Password"onChange={this.changeHandler}  />
          </Form.Group>
          <br/><br/> <Form.Control required placeholder="Cognome" name='surname'  />
        <br/> Data di nascita <Form.Control required type="date" name='birthDate' date-format="YYYY/MM/DD" onChange={this.changeHandler} ></Form.Control>
        <br/><br/><Form.Control  as="select">
         <option value disabled="disabled"name='district' onChange={this.changeHandler} hidden="hidden">Distretto</option>
         <option>district1</option>
        <option>district2</option>
        <option>district3</option>
        </Form.Control>
        <br/><br/> <Form.Control required placeholder="Numero di telefono" name='phoneNumber' onChange={this.changeHandler}  />
        </Col>
       
          
<br/><br/> <button type="submit" class="button button1"  >Registrati</button><br/>
          
       
        </Row>
  </Form>
          
          
<br/><h6>Clicca <Link to ="/login"> <font face='Georgia' color='black'><u>qui</u> </font></Link>per accedere</h6> 





       








      </Container>
    
            
          
          
      
      
      
    
    
    
 </div>
  );
}
}
export default Signin;