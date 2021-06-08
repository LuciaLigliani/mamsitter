import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import axios from 'axios';
import util from '..//util/util';
import { Component } from 'react';

class Unauthorized extends Component {
  constructor(props){
    super(props);
    this.state = {
      link:''
    }
  }
  async componentDidMount(){
    if(!util.getCookie('user_jwt')) {
      this.setState({link: '/'});
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
      axios.get('/api/v1/users/myProfile').then(profile => {
        if (profile.data.data.role === 'admin') this.setState({link: '/search'});
        if (profile.data.data.role === 'famiglia') this.setState({link: '/search'});
        else this.setState({link: '/announcement'});
      }
      ).catch(error=>{
        this.setState({open:true, message:error.response.data.message});
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
          console.log(error);
        })
  }
render(){
  return(
    <div className="error">
      <div  >
        <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
            <ul className="linksNav">
            <Link to="/aboutUs">
                  <li><font face='Georgia' color='black' >LA NOSTRA STORIA</font></li>
                </Link>
                <Link to="/payments">
                  <li><font face='Georgia' color='black'>ABBONAMENTI</font></li>
                </Link>
                
                <Link to="/blog">
                  <li><font face='Georgia' color='black'>BLOG</font></li>
                </Link>

              
                 
              </ul>
     
      <b><h1><font face='Georgia'><br/>
      Non si è autorizzati a visualizzare questa pagina!</font></h1></b>
    <br/>
    <br/>
    
      <h6>Clicca <Link to ={this.state.link}> <font face='Georgia' color='black'><u>qui</u> </font></Link> per tornare alla home</h6>
    </div>

    </div>

  )}

}
export default Unauthorized;