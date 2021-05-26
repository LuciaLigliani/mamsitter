import React from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import AccountCircle from '@material-ui/icons/AccountCircle'

class Payments extends React.Component {
  constructor(props){
    super(props);
    this.state={
      anchorEl:''
    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };
  render(){
    return(
      <div  >
        <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
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
                {/* <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  > <AccountCircle fontSize='large'/>
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
             </Menu> */}
              
                 
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
      <Accordion.Toggle class="button1 button2"  eventKey="0">
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-vetrina"></div>
        <div id="login"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
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
      <Accordion.Toggle class="button1 button2"  eventKey="0">
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-candidati"></div>
        <div id="login"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
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
      Sei una famiglia e vuoi vtrovare il lavoratore più adatto alle tue esigenze più velocemente? <br/>
      Effettua l'abbonamento e avrai la possibilità di creare annunci!<br/>
      Potrai creare vere e proprie proposte di lavoro alle quali i lavoratori potranno inviare la propria candidatura aiutandoti a trovare il lavoratore più adatto.
       </Card.Text>
      <Accordion.Toggle class="button1 button2"  eventKey="0">
        Clicca qui per abbonarti!
      </Accordion.Toggle>
   
    <Accordion.Collapse  eventKey="0">
      <Card.Body> 
        <div id="paypal-button-container-annunci"></div>
        <div id="login"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
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
    <Accordion.Toggle class="button1 button2"  eventKey="0">
      Clicca qui per abbonarti!
    </Accordion.Toggle>
 
  <Accordion.Collapse  eventKey="0">
    <Card.Body> 
      <div id="paypal-button-container-base"></div>
      <div id="login"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
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
    <Accordion.Toggle class="button1 button2"  eventKey="0">
      Clicca qui per abbonarti!
    </Accordion.Toggle>
 
  <Accordion.Collapse  eventKey="0">
    <Card.Body> 
      <div id="paypal-button-container-premium"></div>
      <div id="login"><h6>Effettua il <Link to="/login">login</Link> per poter completare l'abbonamento!</h6></div>
      <div id="unsubscribe"><p style={{fontSize: '10px'}}>E' possibile annullare l'abbonamento in qualsiasi momento collegandosi al proprio account Paypal e scegliendo di disattivarlo.</p></div>
    </Card.Body>
  </Accordion.Collapse>
</Card>

</Accordion>
</Col>
</Row>

      </div>
    );
  }
}
export default Payments;