import React from 'react';
import './App.css';
import AboutUs from'./Components/AboutUs';
import Signin from './Components/Signin';
import Cerca from './Components/Cerca';
import Login from './Components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profilo from './Components/Profilo';
import Payments from './Components/Payments';
import VetrinaPayment from './Components/VetrinaPayment';
import User from './Components/User'

import Blog from './Components/Blog';
import Search from './Components/Search';
import ErrorPage from './Components/ErrorPage';
import Announcements from './Components/Announcements';
import VisualizzaAnnuncio from './Components/VisualizzaAnnuncio';
import Profile from './Components/Profile';
import CreaAnnuncio from './Components/CreaAnnuncio';

function App() {
  return (
    <Router> 
      <div className="App"> 
    
     
      <Switch>
        <Route path="/signup" component={Signin}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/myProfile" component={Profilo}/>
        <Route path="/search" component={Search}/>
        <Route path="/users" component={User} ></Route>
        <Route path="/announcement" component ={Announcements}></Route>
        <Route path="/announcements" component ={VisualizzaAnnuncio}></Route>
        <Route path="/error" component={ErrorPage} ></Route>
        <Route path="/prova" component={Profile} ></Route>
        <Route path="/createann" component={CreaAnnuncio} ></Route>


        <Route path="/aboutUs" component={AboutUs}/>
        <Route path ="/payments" component={Payments}/>
        <Route path ="/vetrina" component={VetrinaPayment}/>
        
        <Route path="/login" component={Login}/>
        <Route path="/" component={Cerca}/>
        
      </Switch>

  
    </div>
    </Router>
    
  );
}
export default App;
