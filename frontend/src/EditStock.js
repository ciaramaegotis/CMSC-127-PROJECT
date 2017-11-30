import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditStock extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class = "ui three column very relaxed grid">
          <div class = "column"></div>
          <div class = "column">
          <form class="ui form">
  <h2 class="ui dividing header">Stock Information</h2>
  <div class="field">
      <div class="field">
        <input type="number" name="shipping[first-name]" placeholder="Enter branch ID.."/>
      </div>
      <div class="field">
        <input type="text" name="shipping[first-name]" placeholder="Product Name"/>
      </div>
      <div class = "field">
        <button class = "large ui inverted button"> Search </button>
      </div>
      <h2 class="ui dividing header">OR</h2> 
      <div class="field">
          <input type="text" name="shipping[last-name]" placeholder="Branch Name"/>
        </div>
      <div class = "ui grid">
        <div class="eight wide column">
          <input type="text" name="shipping[first-name]" placeholder="Product Name"/>
        </div>
        <div class="eight wide column">
          <input type="number" name="shipping[last-name]" placeholder="Number of Stocks"/>
        </div>
      </div> 
      
    </div>  
    <br/>  
</form>
<div class="ui grid">

  <div class="four wide column"><button className = "massive ui red inverted button" onClick={()=>{window.location="/"}}>Delete</button></div>
  <div class="six wide column">
  </div>
  <div class="six wide column"><button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Save</button>
  </div>
  <div class="four wide column"></div>
</div>


</div>
</div>
<div class = "column"></div>
          
        </h2>

      </div>
    );
  }
}

export default EditStock;
