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
// import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';

class VisualizzaAnnuncio extends Component{
  constructor(props){
    super(props);
    this.state= {
      announcement:[],
      id:'',
      title:'',
      typeAnnouncement:'',
      annCity:'',
      annDistrict:'',
      typeWork:'',
      startDate:'',
      endDate:'',
      car:'',
      neededDays:'',
      languages:'',
      senior:[],
      children:[],
      name:'',
      sex:'',
      age:'',
      description:'',
      selfSufficient:'',
      array:[],
      me:'',
      open: false,
      message:'',
      can:''
    }
  }
  setData = (data, specificData) => {
    const startDate =new Date(specificData.startDate).toLocaleDateString();
    let endDate = '';
    if(specificData.endDate) endDate = new Date(specificData.endDate).toLocaleDateString();
    specificData.neededDays.map(el => {
      let id = '';
      if (el.partOfDay === 'morning') id = 'm';
      else if (el.partOfDay === 'afternoon') id = 'p';
      else if (el.partOfDay === 'evening') id = 's';
      else if (el.partOfDay === 'night') id = 'n';
      if(el.weekDay === 'monday') id += 'l';
      else if(el.weekDay === 'tuesday') id += 'ma';
      else if(el.weekDay === 'wednesday') id += 'me';
      else if(el.weekDay === 'thursday') id += 'g';
      else if(el.weekDay === 'friday') id += 'v';
      else if(el.weekDay === 'saturday') id += 's';
      else if(el.weekDay === 'sunday') id += 'd';
      document.getElementById(id).checked = true;
      return el;
    })
    document.getElementById(specificData.typeWork).checked = true;

    if (specificData.homework === true) document.getElementById('homework').checked = true;
    if (specificData.cook === true) document.getElementById('cook').checked = true;
    if (specificData.car === true) document.getElementById('car').checked = true;
    if (specificData.alsoColf === true) document.getElementById('alsoColf').checked = true;
    this.setState({id: data._id});
    this.setState({title: data.title});
    this.setState({typeAnnouncement: data.typeAnnouncement});
    this.setState({annCity: data.annCity});
    this.setState({annDistrict: data.annDistrict});
    this.setState({typeWork: specificData.typeWork});
    this.setState({languages: specificData.languages});
    this.setState({startDate: startDate});
    this.setState({endDate: endDate});
    this.setState({neededDays: specificData.neededDays});
    this.setState({homework: specificData.homework});
    this.setState({cook: specificData.cook});
    this.setState({car: specificData.car});
    this.setState({alsoColf: specificData.alsoColf});
    this.setState({children: specificData.children});
    this.setState({senior: specificData.senior});
}

componentDidMount(){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      this.setState({can: profile.data.data.can});
      this.setState({me: profile.data.data.role});
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
        console.log(error);
      })
  const id= this.props.location.pathname.split('/announcements/')[1];
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
  axios.get('/api/v1/announcements/' + id).then(response => {
    console.log(response.data.data);
    let specificData;
      if(response.data.data.typeAnnouncement === 'babysitter') {
        specificData = response.data.data.babysitterAnn_id;
        this.setState({array: specificData.children});
      }
      else if(response.data.data.typeAnnouncement === 'badante') {
        specificData = response.data.data.badanteAnn_id;
        this.setState({array: specificData.senior});
      }
      else if(response.data.data.typeAnnouncement === 'colf') specificData = response.data.data.colfAnn_id;
      this.setData(response.data.data , specificData);
  })
  .catch(error=>{
    this.setState({open:true, message:error.response.data.message});
      console.log(error);
    })
}

deleteAnn = () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
  axios.delete('/api/v1/announcements/' + this.state.id).then(profile => {
    console.log(profile);
    this.setState({open:true, message:'Annuncio eliminato'})
    if(this.state.me === 'famiglia'){
      setTimeout(()=> {
        window.location.assign('/search');
         }, 30); 
    }
    else if(this.state.me === 'admin'){
      setTimeout(()=> {
        window.location.assign('/announcement');
         }, 30);
    }
      
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
        console.log(error);
      })
}

logout = () => {
  setTimeout(()=> {
    window.location.assign('/');
     }, 10); 
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
}

canUpdate = () => {
  document.getElementById('title').disabled = false;
  document.getElementById('title').style.backgroundColor = '#afafaf3d';
    document.getElementById('homework').disabled = false;
    document.getElementById('cook').disabled = false;
    document.getElementById('car').disabled = false;
    document.getElementById('alsoColf').disabled = false;

    const array = ['l', 'ma', 'me', 'g', 'v', 's', 'd'];
    const arr = ['m', 'p', 's', 'n'];
    arr.forEach(part => {
      array.forEach(day => {
        const id = part + day;
        document.getElementById(id).disabled = false;
      })
    })
    // document.getElementById('name').disabled = false;
    // document.getElementById('sex').disabled = false;
    // document.getElementById('age').disabled = false;
  document.getElementById('salva').hidden = false;
  document.getElementById('aggiorna').hidden = true;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

changeHandler = (e) => {
  if (e.target.name === 'homework') e.target.value = e.target.checked;
  else if (e.target.name === 'cook') e.target.value = e.target.checked;
  else if (e.target.name === 'car') e.target.value = e.target.checked;
  else if (e.target.name === 'alsoColf') e.target.value = e.target.checked;
  this.setState({[e.target.name]: e.target.value});
}

updateAnn = () => {
    const array = ['l', 'ma', 'me', 'g', 'v', 's', 'd'];
    const arr = ['m', 'p', 's', 'n'];
    const neededDays = [];
    arr.forEach(part => {
      array.forEach(day => {
        const id = part + day;
        if(document.getElementById(id).checked === true) {
          let partOfDay = '';
          let weekDay = '';
          if(part === 'm') partOfDay = 'morning';
          else if(part === 'p') partOfDay = 'afternoon';
          else if(part === 's') partOfDay = 'evening';
          else if(part === 'n') partOfDay = 'night';
          if(day === 'l') weekDay = 'monday';
          else if(day === 'ma') weekDay = 'tuesday';
          else if(day === 'me') weekDay = 'wednesday';
          else if(day === 'g') weekDay = 'thursday';
          else if(day === 'v') weekDay = 'friday';
          else if(day === 's') weekDay = 'saturday';
          else if(day === 'd') weekDay = 'sunday';
          const value = {
            partOfDay,
            weekDay
          };
          neededDays.push(value);
        }
      })
    });
    this.state.neededDays = neededDays;

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
  axios.patch('/api/v1/announcements/' + this.state.id, this.state).then(response=>{
    if(response.data.status === 'success') {
      this.setState({open:true, message:'Annuncio aggiornato correttamente'})
      console.log(response.data.data);
     setTimeout(()=> {
        window.location.assign('/announcements/'+this.state.id);
      }, 10);
    }
  }).catch(error=>{
    this.setState({open:true, message:error.response.data.message});
      console.log(error);
    })
}

apply = () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
  axios.post('/api/v1/announcements/' +this.state.id+ '/applications').then(response => {
    console.log(response);
    this.setState({open:true, message:'Candidatura inviata!'})
        setTimeout(()=> {
          window.location.assign('/viewallapplication');
           }, 100); 
  })
  .catch(error=>{
    this.setState({open:true, message:error.response.data.message});
      console.log(error);
    })
}
/*deleteApp = () => {
  axios.delete('/api/v1/announcements/' +this.state.id+ '/applications/'+ appId).then(app=> {
    console.log(app);
    this.setState({open:true, message:'Candidatura eliminata'})
      setTimeout(()=> {
        window.location.assign('/viewallapplication');
         }, 30); 
  })
  .catch((err)=> console.log(err));
}*/

handleClick = (event) => {
  this.setState({anchorEl:event.currentTarget});
}
handleClose = () => {
  this.setState({anchorEl:null});
};

handleClos= (e) => {
  this.setState({open:false})
 }

title = () => {
  if(this.state.typeAnnouncement === 'babysitter') return 'Bambini: ';
  else if(this.state.typeAnnouncement === 'badante') return 'Anziani: ';
}

buttons = () => {
  if(this.state.can === false)
  return (
    <div>
     <Link to="/notapply"> <button class="buttonp buttonpp" style={{marginLeft:30, marginTop:-80}} >Candidati!</button></Link>
    </div>
  )
  else if (this.state.can === true)
  return (
    <div>
  <button class="buttonp buttonpp" onClick={this.apply} style={{marginLeft:30, marginTop:-80}} >Candidati!</button>
    </div>
  )
  if(this.state.me === 'admin') return (
<div>
<font face='Georgia' color="white">
   <button style={{marginRight:10, marginBottom:60}} onClick={this.deleteAnn} className="buttonp buttonpp" >Elimina Annuncio</button></font>
   <Link to={"/application/" + this.state.id}><button class="buttonp buttonpp" style={{marginLeft:30, marginTop:-80}} >Visualizza Candidati</button></Link>
</div>
  )
  else if(this.state.me === 'famiglia') return (
<div>
  <font face='Georgia' color="white">
   <button style={{marginRight:10, marginBottom:60}} onClick={this.deleteAnn} className="buttonp buttonpp" >Elimina Annuncio</button></font>
   <font  face='Georgia' color="white">
   &nbsp; <button style={{marginRight:10, marginTop:60}} onClick={this.canUpdate} id="aggiorna" className="buttonp buttonpp"  >Aggiorna Annuncio</button></font>
    <font> <button style={{marginRight:10, marginTop:60}} onClick={this.updateAnn} id="salva" className="buttonp buttonpp" hidden>Salva</button></font>
    <Link to={"/application/" + this.state.id}><button class="buttonp buttonpp" style={{marginLeft:30, marginTop:-80}} >Visualizza Candidati</button></Link>
</div>
  )
  else return (
<div>
<button class="buttonp buttonpp" onClick={this.apply} style={{marginLeft:30, marginTop:-80}} >Candidati!</button>
</div>
  )

}

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
       id='title'
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
        
<TextField label={this.state.startDate} helperText='data di inizio' onChange={this.changeHandler} id='startDate' name='startDate' style={{ margin: 1, width: 180, top:85, marginLeft:-300}} disabled fullWidth margin="normal"/><br/>
<TextField label={this.state.endDate} helperText='data di fine' onChange={this.changeHandler} id='endDate' name='endDate' style={{ margin: 1, width: 180, top:75, marginLeft:-300}} disabled fullWidth margin="normal"/>
 
 </Col>
  
 </Row>
<Row >
  <br/>
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:50}}  gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
        <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:45, width: 30}}
            disabled
              name='typeWork'
              id="occasionale"
            /><label for="occasionale">Occasionale</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:20, width: 30}}
            disabled
              name='typeWork'
              id="regolare"
            /><label for="regolare">Regolare</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:4, width: 30}}
            disabled
              name='typeWork'
              id="diurno"
            /><label for="diurno">Diurno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:3, width: 30}}
            disabled
              name='typeWork'
              id="aOre"
            /><label for="aOre">Ad ora</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:55, width: 30}}
            disabled
              name='typeWork'
              id="24h"
            /><label for="24h">Tutto il giorno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:20, width: 30}}
            disabled
              name='typeWork'
              id="notturno"
            /><label for="notturno">Notturno</label><br/>
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:300, marginTop:50}}  gutterBottom>
        Giorni disponibili: &nbsp;</Typography>
  <Table striped bordered hover size="sm" style={{width:90, marginLeft:1}} >
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
            style={{marginLeft:-115, textAlign:'left'}}
            disabled
              label="Aiuto compiti"
              name='homework'
              id="homework"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-115, textAlign:'left'}}
            disabled
              label="Cucinare"
              name='cook'
              id="cook"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-115, textAlign:'left'}}
            disabled
              label="Guidare"
              name='car'
              id="car"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-115, textAlign:'left'}}
            disabled
              label="Fare pulizie"
              name='alsoColf'
              id="alsoColf"
            />
            </Col>
  
  </Row>
 <Row>
   <Col sm={2}>
   <Typography style={{ marginLeft:100, marginTop:40}}  gutterBottom>
        {this.title()} &nbsp;</Typography>
 <div className="container_ann" style={{ width:700, marginLeft:30}}> 
      {this.state.array.map(array=>(     
         <div className="card_annunci">
            <div className="card_body_ann">
               <div className="title_ann">
               <Row>
                <Col sm={40} style={{textAlign:'center'}}>
                  <TextField helperText='Nome' label={array.name} id='name' name='name' style={{width:150}} disabled/>
                  <TextField helperText='Sesso' label={array.sex} id='sex' name='sex' style={{width:150}} disabled/>
                  <TextField helperText='Età' label={array.age} id='age' name='age' style={{width:150}} disabled/>
                   {/* <label style={{fontWeight:'bold'}}>Autosufficiente: </label>
                  <label>{array.selfSufficient}</label> */}
       
                </Col>
               </Row>
               </div> 
            </div>
          </div>
      ))} 
      </div>
      </Col>
      </Row>
      <Row>
        <Col>
  {this.buttons()}
        </Col>

</Row>
      
 
  
     </Container>
   
   </div> 

   
      
   </div>


           </div>
    )
  }
}

export default VisualizzaAnnuncio


/*<br/>
  <button class="button1 button2" onClick={this.deleteApp} style={{marginLeft:20}} >Elimina Candidatura</button>*/