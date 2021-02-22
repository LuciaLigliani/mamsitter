import React from 'react';
import './App.css';
import AboutUs from'./Components/AboutUs';
import Signin from './Components/Signin';
import Navbar from './Components/Navbar';
//import Footer from './Components/Footer';
import Cerca from './Components/Cerca';
import Login from './Components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profilo from './Components/Profilo';

function App() {
  return (
    <Router> 
      <div className="App"> 
    
      <Navbar/>
      <Switch>
        <Route path="/signup" component={Signin}/>
        
        <Route path="/myProfile" component={Profilo}/>
        <Route path="/cerca" component={Cerca}/>
        
        <Route path="/aboutUs" component={AboutUs}/>
        
        
        <Route path="/login" component={Login}/>
        <Route path="/" component={Cerca}/>
        
      </Switch>

  
    </div>
    </Router>
    
  );
}
export default App;
