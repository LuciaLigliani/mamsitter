import React from  'react';
import { Component } from 'react';
import '..//App.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logomodi from '..//logomodi.png';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import util from '..//util/util'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class VisualizzaAnnuncio extends Component{
  constructor(props){
    super(props);
    this.state= {
      title:'',
      typeAnnouncement:'',
      annCity:'',
      annDistrict:'',
      typeWork:'',
      startDate:'',
      endDate:'',
      car:'',
      available:'',
      languages:'',
      regular:'',
      occasional:'',
      diurnal:'',
      nocturnal:'',
      allDay:'',
      atHour:'',
      senior:'',
      children:[],
      name:'',
      sex:'',
      age:'',
      description:'',
      selfSufficient:'',
      array:[]
    }
  }
  setData = (data, specificData) => {
    console.log(specificData);
    specificData.startDate= new Date(specificData.startDate).toLocaleDateString();
    specificData.endDate= new Date(specificData.endDate).toLocaleDateString();
    if(specificData.car === true) specificData.car = 'SI';
    if(specificData.car === false) specificData.car = 'NO';
    if(specificData.languages !== undefined){
      specificData.languages = specificData.languages.toString();
    }
    let typeWork = '' ; 
    if(specificData.typeWork === 'occasionale') typeWork += 'occasionale, ' ;
    if(specificData.typeWork === 'diurno') typeWork += 'giornaliero, ' ;
    if(specificData.typeWork === 'notturno') typeWork += 'notturno, ' ;
    if(specificData.typeWork === '24h') typeWork += 'tutto il giorno, ' ;
    if(specificData.typeWork === 'aOre') typeWork += 'a orario, ' ;
    typeWork = typeWork.substring(0, typeWork.length - 2);
    let available = '' ;
    if(specificData.homework === true) available +='aiuto compiti, ';
    if(specificData.cook === true) available += 'cucinare, ';
    if(specificData.alsoColf === true) available += 'pulizie, ';
    available=available.substring(0, available.length - 2);
    this.setState({title: data.title});
    this.setState({typeAnnouncement: data.typeAnnouncement});
    this.setState({annCity: data.annCity});
    this.setState({annDistrict: data.annDistrict});
    this.setState({car: specificData.car});
    this.setState({typeWork: specificData.typeWork});
    this.setState({available: available});
    this.setState({languages: specificData.languages});
    this.setState({startDate: specificData.startDate});
    this.setState({endDate: specificData.endDate});
}

componentDidMount(){
  const id= this.props.location.pathname.split('/announcements/')[1];
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
  axios.get('http://localhost:3000/api/v1/announcements/' + id).then(response => {
    console.log(response.data.data)
    let specificData;
    if(response.data.data.typeAnnouncement === 'babysitter') {
      specificData = response.data.data.babysitterAnn_id;
      this.setState({array: specificData.children})

    }
    if(response.data.data.typeAnnouncement === 'badante') {
      response.data.data.badanteAnn_id.senior.map((senior)=>{
        if(senior.selfSufficient) return senior.selfSufficient = 'Autosufficiente: SI';
        else return senior.selfSufficient = 'Autosufficiente: NO';
      
      })
      specificData = response.data.data.badanteAnn_id;
      this.setState({array: specificData.senior})

    }
    if(response.data.data.typeAnnouncement === 'colf') specificData = response.data.data.colfAnn_id;
    this.setData(response.data.data , specificData); 
  })
  .catch((err)=> {
    console.log(err);

  })
  
}

handleClick = (event) => {
  this.setState({anchorEl:event.currentTarget});
}
handleClose = () => {
  this.setState({anchorEl:null});
};


  render(){
    return(
      <div className="cerca">
      <Link to="/home"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
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
               <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
               <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link> 
             </Menu>
              
           </ul>
     <br/><br/><br/>
     <div className="announcement">
     <Container >
     <Row>
         <Col sm={7}>
       <br/>  <br/> <br/>  
       
       <TextField 
       name='title'
 label={this.state.title}
 style={{  margin: 10, width: 180, left:0}}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}
 disabled
 />  <br/>
  <TextField 
  name='typeAnnouncement'
  id='typeAnnouncement'
  label={this.state.typeAnnouncement}
  select
 style={{  margin: 10, width: 180, left:0 }}
 fullWidth
 disabled
 margin="normal"
 onChange={this.changeHandler}>  <br/>
 <MenuItem value='babysitter' >Babysitter</MenuItem>
 <MenuItem value='badante'>Badante</MenuItem>
 <MenuItem value='colf'>Colf</MenuItem>
 </TextField>
  <br/>
  </Col>
  {/* <Col>
  <br/>
  <TextField label= {this.state.children.map(child => child.name + "  ")} style={{ margin: 1, width: 260, left:-230, bottom: -55 }} disabled/>
 <Button  onClick={this.handleShow} style={{  margin: 1, left:-250, bottom: -100 }}>Bambino+</Button>
      <Modal show={this.state.show} onHide={this.handleClos}>
       
        <Modal.Body>
        <TextField name='name'
 label='Nome'
 style={{ margin: 1, width: 200, left:80, bottom: 10 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
<TextField name='sex'
 label='Sesso'
 style={{  margin: 1, width: 200, left:80, bottom: 10  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
 <TextField name='age'
 label='Età'
 style={{  margin: 1, width: 200, left:80, bottom: 10  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={this.handleClos}>
            Annulla
          </Button>
          <Button  onClick={this.add}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>
         </Col> */}
         <Col>
        
<TextField label={this.state.startDate} helperText='data di inizio' onChange={this.changeHandler} name='startDate' style={{ margin: 1, width: 180, top:85, marginLeft:-300}} disabled/><br/>
<TextField label={this.state.endDate} helperText='data di fine' onChange={this.changeHandler} name='endDate' style={{ margin: 1, width: 180, top:75, marginLeft:-300}} disabled/>
 
 </Col>
  
 </Row>
<Row >
  <br/>
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:50}}  gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
        <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:60, width: 30}}
            disabled
              name='typeWork'
              id="occasionale"
            /><label for="occasionale">Occasionale</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:38, width: 30}}
            disabled
              name='typeWork'
              id="regolare"
            /><label for="regolare">Regolare</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:24, width: 30}}
            disabled
              name='typeWork'
              id="diurno"
            /><label for="diurno">Diurno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:22, width: 30}}
            disabled
              name='typeWork'
              id="aOre"
            /><label for="aOre">Ad ora</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:75, width: 30}}
            disabled
              name='typeWork'
              id="24h"
            /><label for="24h">Tutto il giorno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:40, width: 30}}
            disabled
              name='typeWork'
              id="notturno"
            /><label for="notturno">Notturno</label><br/>
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:300, marginTop:50}}  gutterBottom>
        Giorni disponibili: &nbsp;</Typography>
  <Table striped bordered hover size="sm" style={{width:90, marginLeft:50}} >
  <thead>
    <tr>
      <th></th>
      <th>Lun</th>
      <th>Mar</th>
      <th>Mer</th>
      <th>Gio</th>
      <th>Ven</th>
      <th>Sab</th>
      <th>Dom</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >Mattino</td>
      <td><Form.Check id='ml' disabled/></td>
      <td><Form.Check id='mma' disabled/></td>
      <td><Form.Check id='mme' disabled/></td>
      <td><Form.Check id='mg' disabled/></td>
      <td><Form.Check id='mv' disabled/></td>
      <td><Form.Check id='ms' disabled/></td>
      <td><Form.Check id='md' disabled/></td>
    </tr>
    <tr>
      <td>Pomeriggio</td>
      <td><Form.Check id='pl' disabled/></td>
      <td><Form.Check id='pma' disabled/></td>
      <td><Form.Check id='pme' disabled/></td>
      <td><Form.Check id='pg' disabled/></td>
      <td><Form.Check id='pv' disabled/></td>
      <td><Form.Check id='ps' disabled/></td>
      <td><Form.Check id='pd' disabled/></td>
    </tr>
    <tr>
      <td>Sera</td>
      <td><Form.Check id='sl' disabled/></td>
      <td><Form.Check id='sma' disabled/></td>
      <td><Form.Check id='sme' disabled/></td>
      <td><Form.Check id='sg' disabled/></td>
      <td><Form.Check id='sv' disabled/></td>
      <td><Form.Check id='ss' disabled/></td>
      <td><Form.Check id='sd' disabled/></td>
    </tr>
    <tr>
      <td>Notte</td>
      <td><Form.Check id='nl' disabled/></td>
      <td><Form.Check id='nma' disabled/></td>
      <td><Form.Check id='nme' disabled/></td>
      <td><Form.Check id='ng' disabled/></td>
      <td><Form.Check id='nv' disabled/></td>
      <td><Form.Check id='ns' disabled/></td>
      <td><Form.Check id='nd' disabled/></td>
    </tr>
  </tbody>
</Table>
  
  </Col>
  <Col sm={2}>
<Typography style={{bottom:152, marginLeft:-250, marginTop:50}}  gutterBottom>
        Disponibilità a: &nbsp;</Typography>
        <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
            disabled
              label="Aiuto compiti"
              name='homework'
              id="homework"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
            disabled
              label="Cucinare"
              name='cook'
              id="cook"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
            disabled
              label="Guidare"
              name='car'
              id="car"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
            disabled
              label="Fare pulizie"
              name='alsoColf'
              id="alsoColf"
            />
            </Col>
  
  </Row>
 <Row>
 <div className="container_ann"> 
      {this.state.array.map(array=>(     
         <div className="card_annunci">
            <div className="card_body_ann">
               <div className="title_ann">
               <Row>
                <Col sm={40}>
                {'Nome: ' + array.name} 
               <br/> {'Sesso: ' + array.sex} <br/> 
                {'Anni: ' + array.age} <br/>
                {array.selfSufficient}
       
                </Col>
                <Col>
               
               </Col>
               </Row>
               </div> 
            </div>
          </div>
      ))} 
      </div>
      </Row>
 
     </Container>
   
   </div> 

   
      



           </div>
    )
  }
}

export default VisualizzaAnnuncio