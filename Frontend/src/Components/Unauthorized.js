import React from 'react'
import  Navbar  from '..//Components/Navbar';
import '../App.css';
import {Link} from 'react-router-dom';
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
      axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
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
      <Navbar/>
     
      <b><h1><font face='Georgia'><br/>
      Non si è autorizzati a visualizzare questa pagina!</font></h1></b>
    <br/>
    <br/>
    
      <h6>Clicca <Link to ={this.state.link}> <font face='Georgia' color='black'><u>qui</u> </font></Link> per tornare alla home</h6>
    </div>



  )}

}
export default Unauthorized;