import React from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import util from '..//util/util'
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
class Payments extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: false,
      message:'',
      anchorEl:''
    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };
  handleClos= (e) => {
    this.setState({open:false})
   }

  componentDidMount() {
      document.getElementById('login1').hidden = true;
      document.getElementById('login2').hidden = true;
      document.getElementById('login3').hidden = true;
      document.getElementById('login4').hidden = true;
      document.getElementById('login5').hidden = true;
      document.getElementById('paypal-button-container-vetrina').hidden = false;
      document.getElementById('paypal-button-container-candidati').hidden = false;
      document.getElementById('paypal-button-container-annunci').hidden = false;
      document.getElementById('paypal-button-container-base').hidden = false;
      document.getElementById('paypal-button-container-premium').hidden = false;
      // document.getElementById('cancella3').hidden = true;

    if(!util.getCookie('user_jwt')) {
      document.getElementById('login1').hidden = false;
      document.getElementById('login2').hidden = false;
      document.getElementById('login3').hidden = false;
      document.getElementById('login4').hidden = false;
      document.getElementById('login5').hidden = false;
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      if(profile.data.data.role === 'admin') setTimeout(()=> {
        window.location.assign('/unauthorized');
           }, 0);
      else if(profile.data.data.role === 'famiglia') {
        document.getElementById('vetrina').textContent = 'Non puoi abbonarti';
        document.getElementById('vetrina').disabled = true;
        document.getElementById('candidati').textContent = 'Non puoi abbonarti';
        document.getElementById('candidati').disabled = true;
        if(profile.data.data.can === true){
          document.getElementById('annunci').textContent = 'Sei già abbonato';
          document.getElementById('annunci').disabled = true;
          // document.getElementById('annunci').textContent = 'Cancella abbonamento';
          // document.getElementById('cancella3').hidden = false;
        }
        if(profile.data.data.profile === 'base'){
          document.getElementById('base').textContent = 'Sei già abbonato';
          document.getElementById('base').disabled = true;
        }
        if(profile.data.data.profile === 'premium'){
          document.getElementById('premium').textContent = 'Sei già abbonato';
          document.getElementById('premium').disabled = true;
        }
      }
      else {
        document.getElementById('annunci').textContent = 'Non puoi abbonarti';
        document.getElementById('annunci').disabled = true;
        document.getElementById('base').textContent = 'Non puoi abbonarti';
        document.getElementById('base').disabled = true;
        document.getElementById('premium').textContent = 'Non puoi abbonarti';
        document.getElementById('premium').disabled = true;
        if(profile.data.data.can === true){
          document.getElementById('candidati').textContent = 'Sei già abbonato';
          document.getElementById('candidati').disabled = true;
        }
        if(profile.data.data.highlighted === true){
          document.getElementById('vetrina').textContent = 'Sei già abbonato';
          document.getElementById('vetrina').disabled = true;
        }
      }

    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })

    window.paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          'plan_id': 'P-61489737A52057731MCYW5SY'
        });
      },
      onApprove: function(data, actions) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
        return axios.post('http://localhost:3000/api/v1/payments/highlight', data.subscriptionID).then((response => {
          this.setState({open:true, message:'Abbonamento effettuato!'})
          setTimeout(()=> {
            this.setState({open:false})
               }, 2000);
          setTimeout(()=> {
            window.location.assign('/myProfile');
               }, 1000);
        })).catch(error => {
          this.setState({open:true, message:error.response.data.message});
          setTimeout(()=> {
            this.setState({open:false})
               }, 2000);
            console.log(error);
        });
      },
      onCancel: function (data) {
        document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.setState({open:true, message:'Operazione annullata!'})
    // setTimeout(()=> {
    //   this.setState({open:false})
    //      }, 2000);
    setTimeout(()=> {
          window.location.assign('/payments');
             }, 1000);
      }
  }).render('#paypal-button-container-vetrina');

  window.paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'subscribe'
    },
    createSubscription: function(data, actions) {
      return actions.subscription.create({
        'plan_id': 'P-80G68817K2061102UMCYXAQI'
      });
    },
    onApprove: function(data, actions) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
      return axios.post('http://localhost:3000/api/v1/payments/canApply', data.subscriptionID).then((response => {
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
        setTimeout(()=> {
          window.location.assign('/myProfile');
             }, 1000);
      })).catch(error => {
        this.setState({open:true, message:error.response.data.message});
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
          console.log(error);
      });
    },
    onCancel: function (data) {
      document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.setState({open:true, message:'Operazione annullata!'})
    // setTimeout(()=> {
    //   this.setState({open:false})
    //      }, 2000);
    setTimeout(()=> {
          window.location.assign('/payments');
             }, 1000);
    }
}).render('#paypal-button-container-candidati');

window.paypal.Buttons({
  style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'subscribe'
  },
  createSubscription: function(data, actions) {
    return actions.subscription.create({
      'plan_id': 'P-3C772619M03970249MCYXBOQ'
    });
  },
  onApprove: function(data, actions) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    return axios.post('http://localhost:3000/api/v1/payments/createAnn', data.subscriptionID).then((response => {
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
      setTimeout(()=> {
        window.location.assign('/myProfile');
           }, 1000);
    })).catch(error => {
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
    });
  },
  onCancel: function (data) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.setState({open:true, message:'Operazione annullata!'})
    // setTimeout(()=> {
    //   this.setState({open:false})
    //      }, 2000);
    setTimeout(()=> {
          window.location.assign('/payments');
             }, 1000);
  }
}).render('#paypal-button-container-annunci');

window.paypal.Buttons({
  style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'subscribe'
  },
  createSubscription: function(data, actions) {
    console.log(actions.subscription.revise)
    return actions.subscription.create({
      'plan_id': 'P-2J783879HX5071231MCYXCEY'
    });
  },
  onApprove: function(data, actions) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    return axios.post('http://localhost:3000/api/v1/payments/base', data.subscriptionID).then((response => {
      this.setState({open:true, message:'Abbonamento effettuato!'})
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
      setTimeout(()=> {
        window.location.assign('/myProfile');
           }, 1000);
    })).catch(error => {
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
    });
  },
  onCancel: function (data) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.setState({open:true, message:'Operazione annullata!'})
    // setTimeout(()=> {
    //   this.setState({open:false})
    //      }, 2000);
    setTimeout(()=> {
          window.location.assign('/payments');
             }, 1000);
  }
}).render('#paypal-button-container-base');

window.paypal.Buttons({
  style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'subscribe'
  },
  createSubscription: function(data, actions) {
    return actions.subscription.create({
      'plan_id': 'P-7BH41788FX881821MMCYXCWI'
    });
  },
  onApprove: function(data, actions) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    return axios.post('http://localhost:3000/api/v1/payments/premium', data.subscriptionID).then((response => {
      this.setState({open:true, message:'Abbonamento effettuato!'})
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
      setTimeout(()=> {
        window.location.assign('/myProfile');
           }, 1000);
    })).catch(error => {
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
    });
  },
  onCancel: function (data) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.setState({open:true, message:'Operazione annullata!'})
    // setTimeout(()=> {
    //   this.setState({open:false})
    //      }, 2000);
    setTimeout(()=> {
          window.location.assign('/payments');
             }, 1000);
  }
}).render('#paypal-button-container-premium');
  }

  // cancel = ()=>{
  //   axios.post('https://api-m.sandbox.paypal.com/v1/billing/subscriptions/P-3C772619M03970249MCYXBOQ/cancel', {reason:'Not satisfied'})
  // }

  render(){
    return(
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
      <div  >
        <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
            <ul className="linksNav">
            <Link to="/aboutUs">
                  <li><font face='ABeeZee!important' color='black' >LA NOSTRA STORIA</font></li>
                </Link>
                <Link to="/payments">
                  <li><font face='ABeeZee!important' color='black'>ABBONAMENTI</font></li>
                </Link>
                
                <Link to="/blog">
                  <li><font face='ABeeZee!important' color='black'>BLOG</font></li>
                </Link>

              
                 
              </ul>
  <Row>
  <Col>

  <Accordion >
  <Card style={{top:'120px'}}>
    <Card.Header bg='primary'>VAI IN VETRINA! </Card.Header><br/>
    {/* <Card.Title bg='light'>VETRINA</Card.Title> */}
    <Card.Text>
      Sei un lavoratore e vuoi aumentare la visibilità del tuo profilo? <br/>
      Effettua l'abbonamento e il tuo profilo sarà esposto in vetrina!<br/>
      Verrai messo in evidenza e la famiglia vedrà il tuo profilo prima di quello degli altri lavoratori.
       </Card.Text>
      <Accordion.Toggle class="button1 button2"  eventKey="0" id='vetrina'>
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-vetrina"></div>
        <div id="login1"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
        <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
</Col>
<Col>

  <Accordion >
  <Card style={{top:'120px'}}>
    <Card.Header bg='primary'>CANDIDATI! </Card.Header><br/>
    {/* <Card.Title bg='light'>VETRINA</Card.Title> */}
    <Card.Text>
      Sei un lavoratore e vuoi aumentare notevolmente la visibilità del tuo profilo? <br/>
      Effettua l'abbonamento e potrai candidarti a qualsiasi annuncio!<br/>
      Avrai la possibilità di candidarti ai vari annunci e se il tuo profilo rispecchia le esigenze della famiglia verrai contattato.
       </Card.Text>
      <Accordion.Toggle class="button1 button2"  eventKey="0" id='candidati'>
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-candidati"></div>
        <div id="login2"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
        <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
</Col>
<Col>

  <Accordion >
  <Card style={{top:'120px'}}>
    <Card.Header bg='primary'>CREA ANNUNCI! </Card.Header><br/>
    {/* <Card.Title bg='light'>VETRINA</Card.Title> */}
    <Card.Text>
      Sei una famiglia e vuoi trovare il lavoratore più adatto alle tue esigenze più velocemente? <br/>
      Effettua l'abbonamento e avrai la possibilità di creare annunci!<br/>
      Potrai creare vere e proprie proposte di lavoro alle quali i lavoratori potranno inviare la propria candidatura aiutandoti a trovare il lavoratore più adatto.
       </Card.Text>
      <Accordion.Toggle class="button1 button2"  eventKey="0" id='annunci'>
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-annunci"></div>
        {/* <div id="cancella3"><button class="button1 button2" onClick={this.cancel()}>Cancella</button></div> */}
        <div id="login3"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
        <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
</Col></Row>
<Row><Col>

<Accordion >
<Card style={{top:'120px', left:'200px'}}>
  <Card.Header bg='primary'>PROFILO BASE! </Card.Header><br/>
  {/* <Card.Title bg='light'>VETRINA</Card.Title> */}
  <Card.Text>
    Sei una famiglia e vuoi passare al profilo base? <br/>
    Effettua l'abbonamento e avrai la possibilità di visualizzare tutte le informazioni dei vari lavoratori!<br/>
    Ma, soprattutto, potrai contattare qualsiasi lavoratore per poterlo conoscere meglio.
     </Card.Text>
    <Accordion.Toggle class="button1 button2"  eventKey="0" id='base'>
      Clicca qui per abbonarti!
    </Accordion.Toggle>
 
  <Accordion.Collapse  eventKey="0">
    <Card.Body> 
      <div id="paypal-button-container-base"></div>
      <div id="login4"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
      <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
    </Card.Body>
  </Accordion.Collapse>
</Card>

</Accordion>
</Col><Col>

<Accordion >
<Card style={{top:'120px'}}>
  <Card.Header bg='primary'>PROFILO PREMIUM! </Card.Header><br/>
  {/* <Card.Title bg='light'>VETRINA</Card.Title> */}
  <Card.Text>
    Sei una famiglia e vuoi ricercare i lavoratori verificati dal nostro team? <br/>
    Effettua l'abbonamento e potrai visualizzare anche i profili dei lavoratori verificati!<br/>
    Avrai la possibilità di visualizzare anche una piccola recensione aggiunta a seguito di un'accurata selezione e verifica delle informazioni inserite.
     </Card.Text>
    <Accordion.Toggle class="button1 button2"  eventKey="0"  id='premium'>
      Clicca qui per abbonarti!
    </Accordion.Toggle>
 
  <Accordion.Collapse  eventKey="0">
    <Card.Body> 
      <div id="paypal-button-container-premium"></div>
      <div id="login5"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
      <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
    </Card.Body>
  </Accordion.Collapse>
</Card>

</Accordion>
</Col>
</Row>

      </div></div>
    );
  }
}
export default Payments;