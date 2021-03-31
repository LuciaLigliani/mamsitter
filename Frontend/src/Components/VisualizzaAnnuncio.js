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
         <Col sm={1}>  
         </Col>
         <Col sm={7}>
       <br/>  <br/>
  <TextField name='title'
 label={this.state.title}
 disabled
 style={{  margin: -20, width: 200, left:-210 }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='typeAnnouncement'
 label={this.state.typeAnnouncement}
 disabled
 style={{ margin: 2, width: 200, left:-210 }}
 fullWidth
 margin="normal"/>  <br/>
<TextField name='annCity'
 label={this.state.annCity}
 disabled
 style={{  margin: 1, width: 200, left:-210 }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='annDistrict'
 label={this.state.annDistrict}
 disabled
 style={{  margin:  0, width: 200, left:-210 }}
 fullWidth
 margin="normal"/>  <br/>
  <TextField name='startDate'
 label={'da: ' + this.state.startDate}
 disabled
 style={{  margin:  0, width: 100, left:-210 }}
 fullWidth
 margin="normal"/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <TextField name='endDate'
 label={'a: ' + this.state.endDate}
 disabled
 style={{  margin:  0, width: 100, left:-210 }}
 fullWidth
 margin="normal"/>  <br/>
         </Col>
         <Col>
         <Typography style={{marginTop:52, marginLeft:-730}} variant="subtitle1" gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
     
<TextField 
name='typeWork'
 label={this.state.typeWork}
 disabled
 style={{  marginLeft: -200    , width: 400, bottom:70}}
 fullWidth
 margin="normal"/> 

 <br/>
 <Typography style={{marginTop:-38, marginLeft:-730}} variant="subtitle1" gutterBottom> Richieste per: &nbsp;
        </Typography>
  <TextField name='available'
 label={this.state.available}
 disabled
 style={{  marginLeft: -200  , width: 400,bottom:70}}
 fullWidth
 margin="normal"/><br/>
 <Typography style={{marginTop:-35, marginLeft:-730}} variant="subtitle1" gutterBottom> Lingue parlate:&nbsp;
        </Typography>
 <TextField name='languages'
 label={this.state.languages}
 disabled
 style={{  marginLeft: -196 , width: 400, bottom:70}}
 fullWidth
 margin="normal"/>
 <Typography style={{marginTop:-40, marginLeft:-750}} variant="subtitle1" gutterBottom> Automunita:
        </Typography>
 <TextField name='car'
 label={this.state.car}
 disabled
 style={{ marginLeft:-530  , width: 100,  bottom:70  }}
 fullWidth
 margin="normal"/>
 </Col>
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
 </Row>
 
     </Container>
   
   </div> 

   
      



           </div>
    )
  }
}

export default VisualizzaAnnuncio