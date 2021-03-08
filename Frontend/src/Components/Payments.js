import React from 'react';
import {Link} from 'react-router-dom';
import '..//App.css';

class Payments extends React.Component {
render() {
  return ( 
    <div>
      <Link to="/vetrina"><h1>Highlighted</h1></Link>
      <Link to="/canCreate"><h1>Can create announcements</h1></Link>
      <Link to="/canApply"><h1>Can apply</h1></Link>
      <Link to="/base"><h1>Base profile</h1></Link>
      <Link to="/premium"><h1>Premium profile</h1></Link>
      <Link to="/topClass"><h1>TopClass profile</h1></Link>

    </div>
  );
}
}
export default Payments;