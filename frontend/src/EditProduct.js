import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class EditProducts extends Component{
  constructor(props){
    super(props);
    this.state = {
      branchList: [],
      currentBranch: 0
    }

  }

  componentDidMount(){
    fetch('http://localhost:1337/all-branch')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({branchList: result})})
    .then(()=>{console.log(this.state.branchList)})
    .catch((e)=>{console.log(e);});
  }

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
            {
              this.state.branchList.map(
              (item, index)=>{
                return(
                  <option value={item.Branch_id}> {item.Branch_name}</option>
                )
              }
            )
            }
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

export default EditProducts;

