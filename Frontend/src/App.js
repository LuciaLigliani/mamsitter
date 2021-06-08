import React from 'react';
import './App.css';
import AboutUs from'./Components/AboutUs';
import Signin from './Components/Signin';
import Cerca from './Components/Cerca';
import Login from './Components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Payments from './Components/Payments';
import User from './Components/User'

import Blog from './Components/Blog';
import Search from './Components/Search';
import NotAuthenticated from './Components/NotAuthenticated';
import Unauthorized from './Components/Unauthorized';
import Announcements from './Components/Announcements';
import VisualizzaAnnuncio from './Components/VisualizzaAnnuncio';
import Profile from './Components/Profile';
import CreaAnnuncio from './Components/CreaAnnuncio';
import VisualizzaTuttiGliAnnunci from './Components/VisualizzaTuttiGliAnnunci';
import VisualizzaCandidature from './Components/VisualizzaCandidature';
import Candidature from './Components/Candidature';
import ErrorAnn from './Components/ErrorAnn';
import ErrorApply from './Components/ErrorApply';
import ErrorHigh from './Components/ErrorHigh';


function App() {
  return (
    <Router> 
      <div className="App"> 
    
     
      <Switch>
        <Route path="/blog" component={Blog}/>
        <Route path="/aboutUs" component={AboutUs}/>

        <Route path="/notAuthenticated" component={NotAuthenticated} ></Route>
        <Route path="/unauthorized" component={Unauthorized} ></Route>
        {/* <Route path="/prova" component={Profile} ></Route> */}

        <Route path="/notcreate" component={ErrorAnn} ></Route>
        <Route path="/nohigh" component={ErrorHigh} ></Route>
        <Route path="/notapply" component={ErrorApply} ></Route>
        
        <Route path ="/payments" component={Payments}/>
        {/* <Route path ="/vetrina" component={VetrinaPayment}/> */}

        
        {/* registrazione */}
        <Route path="/signup" component={Signin}/>
        {/* login */}
        <Route path="/login" component={Login}/>
        {/* cerca lavoratore */}
        <Route path="/search" component={Search}/>
        {/* cerca annunci */}
        <Route path="/announcement" component ={Announcements}></Route>
        {/* visualizza profilo personale */}
        <Route path="/myProfile" component={Profile}/>
        {/* crea annuncio */}
        <Route path="/createann" component={CreaAnnuncio} ></Route>
        {/* visualizza candidature inviate */}
        <Route path="/viewallapplication" component={VisualizzaCandidature} ></Route>
        {/* visualizza annunci creati */}
        <Route path="/viewallann" component={VisualizzaTuttiGliAnnunci} ></Route>
        {/* visualizza annuncio */}
        <Route path="/announcements" component ={VisualizzaAnnuncio}></Route>
        {/* visualizza lavoratore */}
        <Route path="/users" component={User} ></Route>
        {/* visualizza candidature di un annuncio */}
        <Route path="/application" component={Candidature} ></Route>
        {/* home */}
        <Route path="/" component={Cerca}/>
        
      </Switch>

  
    </div>
    </Router>
    
  );
}
export default App;
