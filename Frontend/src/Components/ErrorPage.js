import React from 'react'
import  Navbar  from '..//Components/Navbar';
import '../App.css';
import {Link} from 'react-router-dom';
function ErrorPage() {

  return(
    <div className="error">
      <Navbar/>
     
      <b><h1><font face='Georgia' color="red" >Attenzione!<br/>
      </font></h1></b>
      <b><h1><font face='Georgia'><br/>
      Per visualizzare questa pagina bisogna essere iscritti al sito!</font></h1></b>
    <br/>
    <br/>
      <h6>Clicca <Link to ="/signup"> <font face='Georgia' color='black'><u>qui</u> </font></Link> per effettuare la registrazione</h6>
    </div>



  )

}


export default ErrorPage;