import React from 'react'
import  Navbar  from '..//Components/Navbar';
import '../App.css';
import {Link} from 'react-router-dom';
function ErrorPage() {

  return(
    <div className="error">
      <Navbar/>
     
      <b><h1><font face='ABeeZee!important'><br/>
      Per visualizzare questa pagina bisogna essere autenticati!</font></h1></b>
    <br/>
    <br/>
      <h6>Clicca <Link to ="/login"> <font face='ABeeZee!important' color='black'><u>qui</u> </font></Link> per effettuare il login</h6>
    </div>



  )

}


export default ErrorPage;