import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditProduct extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class = "ui three column very relaxed grid">
          <div class = "column"></div>
          <div class = "column">
          <form class="ui form">
  <h2 class="ui dividing header">Product Information</h2>
  <div class="field">
    


      <div class="field">
        <input type="number" name="shipping[first-name]" placeholder="Enter product number.."/>
      </div>
      <div class = "field">
        <button class = "large ui inverted button"> Search </button>
      </div>
      <h2 class="ui dividing header">OR</h2> 
      <div class = "ui grid">
        <div class="column">
          <input type="text" name="shipping[last-name]" placeholder="Product Name"/>
        </div>
      </div> 
      <div class = "ui grid">
        <div class="eight wide column">
          <input type="number" name="shipping[last-name]" placeholder="Price"/>
        </div>
        <div class="eight wide column">
          <select class="ui fluid search dropdown" name="card[expire-month]">
            <option value="">Branch</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>    
  </div>   
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

export default EditProduct;
