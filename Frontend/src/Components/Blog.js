import React from 'react'
import  Navbar  from '..//Components/Navbar';
import '../App.css';

import CircularProgress from '@material-ui/core/CircularProgress';
function Blog() {

  return(
    <div className="error">
      <Navbar/>
     
      <b><h1><font face='Georgia'><br/>
      Pagina in costruzione
      <br/>
      <CircularProgress color="white" />
      </font></h1></b>
    
    </div>



  )

}


export default Blog;