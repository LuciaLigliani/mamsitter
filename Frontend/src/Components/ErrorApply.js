import React, { Component } from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import util from '..//util/util'
import { Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'

class ErrorApply extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl:''
    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };
  componentDidMount() {
    console.log(window.paypal);
    window.paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
        return axios.get('http://localhost:3000/api/v1/users/myProfile').then((data => {
          console.log(data.data.data.role);
          return actions.subscription.create({
            'plan_id': 'P-0BA48243K7280713TMBF6VSY'
          });
        })).catch(err => {
          alert('error');
          console.log(err);
        });
      },
      onApprove: function(data, actions) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
        return axios.post('http://localhost:3000/api/v1/payments/highlight', ).then((data => {
          console.log(data.data.data);
          console.log(data);
        })).catch(err => {
          alert('qualcosa è andato storto')
          console.log(err);
        });
      },
      onCancel: function (data) {
        // Show a cancel page, or return to cart
        alert('Hai annullato il pagamento');
        // setTimeout(()=> {
        //   window.location.assign('/vetrina');
        // }, 10); 
      }
  }).render('#paypal-button-container');
}

render(){
 return( 
 <div  >
  <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
      <ul className="linksNav">
          <Link to="/">
            <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
          </Link>
          <Link to="/">
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
        <Link to="/announcement"> <MenuItem onClick={this.handleClose}>Cerca</MenuItem></Link>
       </Menu>
        
           
        </ul>
<Col>

<Accordion >
<Card style={{top:'120px', width:'50rem', left:'130px', bottom:'-3px' }}>
<Card.Header bg='primary'>ATTENZIONE! </Card.Header><br/>
<Card.Title bg='light'>CANDIDARSI AD UN ANNUNCIO</Card.Title>
<Card.Text>
 Abbonati per avere la possibilità di abbonarti a tutti gli annunci che vuoi!<br/>
 Avrai la possibilità di metterti in contatto con le famiglie che rispecchiano le tue esigenze. <br/>
Candidandoti avrai la possibilità di metterti in contatto con loro!!
 </Card.Text>
<Accordion.Toggle class="button1 button2"  eventKey="0">
  Clicca qui per abbonarti!
</Accordion.Toggle>

<Accordion.Collapse  eventKey="0">
<Card.Body> <div id="paypal-button-container"></div></Card.Body>
</Accordion.Collapse>
</Card>
</Accordion>
</Col>

</div>
 );
}
}
export default ErrorApply;