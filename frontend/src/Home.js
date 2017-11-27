import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class Home extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <button id = "centerButton" className = "ui inverted teal button ui center aligned button"> Buy </button>
        <button id = "centerButton" className = "ui inverted teal button ui center aligned button"> Start Transaction </button>
        <button id = "centerButton" className = "ui inverted teal button ui center aligned button"> View Stocks </button>
        </h2>
      </div>
    );
  }
}

export default Home;
