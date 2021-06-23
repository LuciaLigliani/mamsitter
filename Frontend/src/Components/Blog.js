import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';

import CircularProgress from '@material-ui/core/CircularProgress';
function Blog() {

  return(
    <div className="error">
      <div  >
        <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
            <ul className="linksNav">
            <Link to="/aboutUs">
                  <li><font face='ABeeZee!important' color='black' >LA NOSTRA STORIA</font></li>
                </Link>
                <Link to="/payments">
                  <li><font face='ABeeZee!important' color='black'>ABBONAMENTI</font></li>
                </Link>
                
                <Link to="/blog">
                  <li><font face='ABeeZee!important' color='black'>BLOG</font></li>
                </Link>

              
                 
              </ul>
     
      <b><h1><font face='ABeeZee!important'><br/>
      Pagina in costruzione
      <br/>
      <CircularProgress color="white" />
      </font></h1></b>
    
    </div>
    </div>


  )

}


export default Blog;