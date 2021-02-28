import React from 'react';
import '..//App.css';

import {Link} from 'react-router-dom';
import { Component } from 'react';
import mamsitter from '..//mamsitter.png';
import { Col, Row } from 'react-bootstrap';
import { FormLabel } from '@material-ui/core';
import Navbar from '..//Components/Navbar'
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
 /*check = (e) => {
  if(this.state === isValidElement) {
    a href to="/myProfile"></Link>
  } 
}
  if(document.getElementById('email').checked){
    alert("inserisci la tua email:"+document.getElementById('email').value)
  } else if(document.getElementById('password').checked){
    alert("inserisci la pw:"+document.getElementById('password').value)
  }*/
  /* if(this.state) === isValid{
    return <Link to="/cerca"></Link>
  };
  if (this.state == isValid) {
    console.log('ok')}
    <Link to="/myProfile"></Link>
    {
    console.log('error')
  }*/


  render(){
  return (
    
    <div className="pagSignin"><Navbar></Navbar>
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
        <br/><br/> <Form.Control required name='sex' as="select" onChange={this.changeHandler}>
         <option value  hidden="hidden"  >Sesso</option>
         <option value='M'>M</option>
         <option value='F'>F</option> 
          </Form.Control>
          <br/> <br/><Form.Control required as="select" name='city'onChange={this.changeHandler}  >
           <option value hidden="hidden">Città</option>
           <option>Milano</option>
           </Form.Control>
           <br/> <br/> <Form.Control placeholder="Descrizione" name='description' onChange={this.changeHandler}/>

          </Col> 
          <Col>
        <br/> <Form.Control required name='role' as="select" defaultValue="Scegli ruolo" onChange={this.changeHandler} > 
        <option>Scegli ruolo</option>
        <option value='famiglia'>Famiglia</option>
        <option value='babysitter'>Babysitter</option>
        <option>Badante</option>
        <option>Colf</option>
      </Form.Control>
      <Form.Group controlId="formPassword">
         <br/> <Form.Control required name='passwordConfirm'  type="password" placeholder="Conferma Password"onChange={this.changeHandler}  />
          </Form.Group>
          <br/><br/> <Form.Control required placeholder="Cognome" name='surname' onChange={this.changeHandler}/>
        <br/> Data di nascita <Form.Control required type="date" name='birthDate' date-format="YYYY/MM/DD" onChange={this.changeHandler} ></Form.Control>
        <br/><br/><Form.Control  as="select" name='district' onChange={this.changeHandler} >
         <option value disabled="disabled"  hidden="hidden">Distretto</option>
         <option value='district'>distretto</option>
         <option value='district1'>district1</option>
        <option value='district2'>district2</option>
        <option valure='district3'>district3</option>
        </Form.Control>
        <br/><br/> <Form.Control required placeholder="Numero di telefono" name='phoneNumber' onChange={this.changeHandler}  />
        </Col>
       

          
<br/><br/>
<button  type="submit" class="button button1"  >Registrati</button><br/>
       
        </Row>
  </Form>
          
          
<br/><h6>Clicca <Link to ="/login"> <font face='Georgia' color='black'><u>qui</u> </font></Link>per accedere</h6> 





       








      </Container>
    
            
          
          
      
      
      
    
    
    
 </div>
  );
}
}
export default Signin;