import React from 'react';
import './App.css';
import Home from './Components/Home';
import AboutUs from'./Components/AboutUs';
import Signin from './Components/Signin';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cerca from './Components/Cerca';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router> 
      <div className="App"> 
      <Navbar/>
      <Switch>
        <Route path="/registrazione" component={Signin}/>
        
        <Route path="/cerca" component={Cerca}/>
        
        <Route path="/aboutUs" component={AboutUs}/>
        
        
        <Route path="/" component={Home}/>
        
      </Switch>
  <Footer/>
    </div>
    </Router>
  );
}
export default App;
