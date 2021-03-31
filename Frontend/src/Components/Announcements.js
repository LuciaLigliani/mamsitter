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
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import util from '..//util/util'


class Announcements extends Component {
  constructor(props){
    super(props);
    this.state = {
      announcements: [],
      user_id: '',
      anchorEl:'',
      title:'',
      typeAnnouncement: '',
      typeWork:'',
      startDate:'',
      annCity:'',
      annDistrict:'',
      regular:'',
      occasional:'',
      diurnal:'',
      nocturnal:'',
      allDay:'',
      atHour:''

    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };

  setData(date) {
    date=new Date(date).toLocaleDateString();
    if(date==='Invalid Date')
    return '';  
    return date;
  }

  changeHandler = (e) => {
    if(['regular', 'occasional', 'diurnal', 'nocturnal', 'atHour', 'allDay'].includes(e.target.name))
    this.setState({[e.target.name]:e.target.checked});
    else this.setState({[e.target.name]:e.target.value})
    }

    createQuery () {
      let filter = '';
        if(this.state.startDate) 
        filter = (filter || '?') + 'startDate[gte]='+this.state.startDate+'&';
        if(this.state.annCity) filter = (filter || '?') + 'annCity='+this.state.annCity+'&';
        if(this.state.typeAnnouncement) filter = (filter || '?') + 'typeAnnouncement='+this.state.typeAnnouncement+'&';
        if(this.state.regular) filter = (filter || '?') + 'regolare='+this.state.regular+'&';
        if(this.state.occasional) filter = (filter || '?') + 'occasionale='+this.state.occasional+'&';
        if(this.state.district) filter = (filter || '?') + 'district='+this.state.district+'&';
        if(this.state.diurnal) filter = (filter || '?') + 'diurno='+this.state.diurnal+'&';
        if(this.state.nocturnal) filter = (filter || '?') + 'notturno='+this.state.nocturnal+'&';
        if(this.state.allDay) filter = (filter || '?') + 'allDay='+this.state.allDay+'&';
        if(this.state.atHour) filter = (filter || '?') + 'aOre='+this.state.atHour+'&';
  
      return filter;
    }
  async componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url='http://localhost:3000/api/v1/announcements';
    axios.get(url).then(response=>{

    this.setState({announcements: response.data.data});
    })
    .catch(error=>{
     console.log(error);
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const query = this.createQuery();
    const url = 'http://localhost:3000/api/v1/announcements' + query;
    axios.get(url).then(response=>{
      this.setState({announcements: response.data.data});
      console.log(url);
    })
    .catch(error=>{
      console.log(error);
    })
  }


  render(){
    return (
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
    
              <Col>
        <Form onSubmit={this.submitHandler}  className="formm"> 
        <br/>
        <h3><font face='Georgia' color='black'>Cerca un annuncio</font> </h3>
          <Row>
            <Col sm={5}> 
            <br/><Form.Control style={{marginLeft:100}} name='annCity' as="select" defaultValue="Città" onChange={this.changeHandler} > 
               <option value='' >Città</option>
               <option>Milano</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='annDistrict' as="select" defaultValue="Distretto" onChange={this.changeHandler} > 
               <option value =''>Distretto</option>
               <option value='district1'>district1</option> 
               <option value='district2'>district2</option> 
               <option value='district3'>district3</option> 
            </Form.Control><br/>
              <Form.Control style={{marginLeft:100}} name='startDate' type="date" placeHolder="Inserisci data inizio" onChange={this.changeHandler} /> <br/>
            <Form.Control style={{marginLeft:100}} name='typeAnnouncement' as="select" defaultValue="Tipo di annuncio" onChange={this.changeHandler} > 
               <option value='' >Tipo di annuncio</option>
               <option value='babysitter'>Babysitter</option> 
               <option value='colf'>Colf</option> 
               <option value='badante'>Badante</option> 
            </Form.Control><br/>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label style={{marginLeft:90}} as="legend" column sm={9}>
             <br/> <font face='Georgia' color="black"><h5>  Tipologia di lavoro</h5></font>  
              </Form.Label>
             <Col sm={9}>
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Occasionale"
              name='occasionale'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Regolare"
              name='regolare'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Giornaliero"
              name='diurno'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="A ora"
              name='aOra'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Al giorno"
              name='allDay'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Notturno"
              name='notturno'
              id="formHorizontalRadios3"
            />
          </Col>
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
          <button type="submit" class="button1 button2" style={{marginLeft:80}} >Cerca</button>
          </Col>
          </Row>
        </Form>
    </Col>

    <Col>
    
    <iframe title="mamsitter" src="https://www.google.com/maps/d/u/0/embed?mid=1ETRb4lxy5gvfF2m--GB1cOAJNCdmSRfs"  style={{marginLeft:650,  width:450, height:380, marginTop:-300, marginBottom:40}} loading="lazy" ></iframe>
     </Col>




    <div className="card_container_ann"> 
      {this.state.announcements.map(announcements=>(     
         <div className="card_ann">
            <div className="card_body_ann">
               <div className="card_title_ann">
               <Row>
                <Col sm={8}>
                  {'TITOLO: ' + announcements.generalAnnouncement.title} <br/> {'TIPOLOGIA: ' + announcements.generalAnnouncement.typeAnnouncement} <br/> 
                  {'DA: ' + this.setData(announcements.specificAnnouncement.startDate)} <br/>
                  {'A: ' + this.setData(announcements.specificAnnouncement.endDate)}<br/>
                </Col>
                <Col>
                <br/>
                <br/>
                <br/>
               <Link to={"/announcements/" + announcements.generalAnnouncement._id} > <button class="button1 button2" style={{marginLeft:20}} >Visualizza Annuncio</button></Link>
               </Col>
               </Row>
               </div> 
            </div>
          </div>
      ))} 
            

      </div>
      
      

</div>







    );
  }













}

export default Announcements;