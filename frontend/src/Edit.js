import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class Edit extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "vertical ui buttons">
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditCustomer"}}>Edit Customer</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditPromostar"}}>Edit Promostar</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditProduct"}}>Edit Product</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditBranch"}}>Edit Branch</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditStock"}}>Edit Stock</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditReward"}}>Edit Reward</button>
            <button className = "massive ui inverted button" onClick={()=>{window.location="/EditTransaction"}}>Edit Transaction</button>
          </div>
          
        </h2>
      </div>
    );
  }
}

export default Edit;
