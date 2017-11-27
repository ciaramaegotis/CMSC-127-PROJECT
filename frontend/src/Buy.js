import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class Buy extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <button id = "centerButton" className = "ui inverted teal button ui center aligned button" onClick={()=>{window.location="/"}}> Buy </button>
        </h2>
      </div>
    );
  }
}

export default Buy;
