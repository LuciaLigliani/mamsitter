import React from 'react'
import  Navbar  from '..//Components/Navbar';
import '../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import util from '..//util/util';

function ErrorPage() {

  return(
    <div className="error">
      <Navbar/>
     
      <b><h1><font face='Georgia'><br/>
      Non si è autorizzati a visualizzare questa pagina!</font></h1></b>
    <br/>
    <br/>
    
      <h6>Clicca <Link to ={() => {
      let link;
      if(!util.getCookie('user_jwt')) link = '/';
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
      axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
        console.log(profile.data.data.role)
        if (profile.data.data.role === 'admin') link = '/search';
        if (profile.data.data.role === 'famiglia') link = '/search';
        else link = '/announcement';
        console.log(link);

        return link;
      }).catch(error=>{
        this.setState({open:true, message:error.response.data.message});
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
          console.log(error);
        })
      return link;
    }}> <font face='Georgia' color='black'><u>qui</u> </font></Link> per tornare alla home</h6>
    </div>



  )

}


export default ErrorPage;