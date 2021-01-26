import React from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import Form from 'react-bootstrap/Form'
import Signin from './Signin';
function Home() {


  return (
    <div className="pagLogin">
      <Form className="Login">
        <Form.Group controlId="formBasicEmail">
          <Form.Label><font face='Georgia'><h3>ACCEDI A<br/> </h3></font></Form.Label>
            <font face='Georgia'><br/><h5> Inserisci la tua e-mail</h5></font>
          <Form.Control type="email" placeholder="Email" /><br/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <font face='Georgia'><h5>Inserisci la tua password </h5></font>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
          <button type="button" class="btn btn-outline-white">Login</button><br/>
          <FacebookIcon></FacebookIcon><InstagramIcon></InstagramIcon>
          <font face='Georgia' color='black'><br/><h6>Clicca<Signin>qui</Signin>per registrarti</h6></font>
      </Form>
    </div>
  ); 
}
export default Home;

