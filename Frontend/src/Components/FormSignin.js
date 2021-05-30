import React, {Component} from 'react';
import '..//App.css';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios'


// import Form from 'react-bootstrap/Form'
// import Container from 'react-bootstrap/Container'
//import FormBabysitter from './FormBabysitter';
//import FormFamiglia from './FormFamiglia';

/*function select(value) {
  switch (value) {
    case 'babysitter':
      return (<FormBabysitter/>);
    case 'famiglia':
      return <FormFamiglia/> 
    default: 
    return '';
  }
}*/

//let form = {email: "", password: "", ruolo : ""}

/*const [form, setForm] = React.useState({
  email: '',
  password: '',
  ruolo: '',
});
//const changeEmail = (event)=>{form.email=event.target.value; console.log(form)}
const change = (event) => {
  setForm({ ...form, [event.target.name]: event.target.value })
  console.log(form)
};*/
/*const signup = () => {
  axios.post('http://localhost:3001/signup');

};
*/


class FormSignin extends Component {
 constructor(props) {
   super(props)
   this.state = {
     email:'',
     role:'',
     password:'',
     passwordConfirm:''
   }
 }
 
changeHandler = (e) => {
  this.setState({[e.target.name]: e.target.value})
}
submitHandler = (e) => {
  e.preventDefault()
  console.log(this.state)
  axios.post('http://localhost:3000/auth/signup', this.state).then(response=>{
      console.log(response)
    })
    .catch(error=>{
    console.log(error.response)
      //invece di console log prendo error.message e trovo il modo di farlo visualizzare 
    })
}


render(){ 
 const {email, password, role, passwordConfirm} = this.state
  return(
    
    <Form onSubmit={this.submitHandler} className="dialog">
    <font face='Georgia'><h4>Compila il modulo per la registrazione</h4></font><br/>
      <Row>
        <Col>
          <Form.Control required placeholder="Email"  name='email' value={email} onChange={this.changeHandler}/><br/>
          
        </Col>
        <Col>
  <Form.Control required name='role' as="select" value={role} onChange={this.changeHandler} defaultValue="Scegli ruolo"> 
        <option>Scegli ruolo</option>
        <option value="famiglia">Famiglia</option>
        <option value="babysitter">Babysitter</option>
        <option>Badante</option>
        <option>Colf</option>
      </Form.Control>
        </Col>
      
      </Row>
        <Row>
        <Col>
        <Form.Group controlId="formBasicPassword">
          <Form.Control  name='password' type="password" placeholder="Password" value={password} onChange={this.changeHandler} /></Form.Group>
        </Col>
        <Col>
            <Form.Control name='passwordConfirm' value={passwordConfirm} onChange={this.changeHandler} placeholder="Conferma Password" /><br/>
          
        </Col>
        </Row>
        <Form className="formSignin">
        <Row>
                          <Col>
                            Nome
                            <Form.Control placeholder="Nome" name='name'  /><br/>
                            <Form.Control as="select" name='city' >
                              <option value disabled="disabled" hidden="hidden">Città</option>
                              <option>Milano</option>
                            </Form.Control>
                          </Col>
                          <Col>
                            Cognome
                            <Form.Control name='surname' placeholder="Cognome"/>
                            <br/><Form.Control name='district' as="select">
                              <option value disabled="disabled" hidden="hidden">Distretto</option>
                              <option>district1</option>
                              <option>district2</option>
                              <option>district3</option>
                            </Form.Control>
                          </Col>
                          <Col>
                            Sesso
                             <Form.Control name='sex' as="select"> <br/> <option value disabled="disabled" hidden="hidden">Sesso</option><option value="m">M</option><option value="f">F</option> 
                             </Form.Control>
                             <br/><Form.Control name='description' placeholder="Descrizione "/>
                             <label><input type="date"
></input>                 </label>            Data di nascita
                  
                          </Col>
                        </Row>
      </Form>
        <Button type="submit" >registrati</Button>
        
  </Form>  
  );
}
}
export default FormSignin;