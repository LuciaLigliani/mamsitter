import React from 'react';
import './App.css';
function Post(props) {
  return (
  <div className="Post">
    <h2> {props.author} </h2>
    <h4>{props.desc}</h4>
     <h4>{props.age}</h4>
    <button>Like</button>
  </div>
  )
}
export default Post;