import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class ViewStocks extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "vertical ui buttons">
            <button className = "massive ui inverted button" onClick={()=>{window.location="/ViewBranches"}}>View Branches</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/ViewCustomers"}}>View Customers</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/ViewTransactions"}}>View Transactions</button>
          </div>
          </h2>
      </div>
    );
  }
}

export default ViewStocks;
