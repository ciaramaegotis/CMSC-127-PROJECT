import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditTransaction extends Component {
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class = "ui three column very relaxed grid">
          <div class = "column"></div>
          <div class = "column">
          <form class="ui form">
  <h2 class="ui dividing header">Transaction Information</h2>
  <div class="field">
    


      <div class="field">
        <input type="number" name="shipping[first-name]" placeholder="Enter Transaction Number.."/>
      </div>
      <div class = "field">
        <button class = "large ui inverted button"> Search </button>
      </div>
      <h2 class="ui dividing header">OR</h2>  
      <div class = "ui grid">
        <div class="eight wide column">
          <input type="date" name="shipping[last-name]" placeholder="Date"/>
        </div>
        <div class="eight wide column">
          <input type="time" name="shipping[last-name]" placeholder="Time"/>
        </div>
      </div> 
      <br/>
      <div class = "field">
        <input type="number" name="" placeholder="Card Number"/>
      </div>
      <div class = "ui grid">
        <div class="eight wide column">
          <input type="number" name="shipping[last-name]" placeholder="Cash Payment"/>
        </div>
        <div class="eight wide column">
          <input type="number" name="shipping[last-name]" placeholder="Reward Point Payment"/>
        </div>
      </div> 
      <br/>
      <div class="field">
        <input type = "number" name = "" placeholder="Accumulated Reward Points"/>
      </div>
    </div>  
    <br/>  
</form>


  <div class="six wide column"><button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Save</button>
  </div>



</div>
</div>
<div class = "column"></div>
          
        </h2>

      </div>
    );
  }
}

export default EditTransaction;
