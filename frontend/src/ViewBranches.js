import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';



class ViewBranches extends Component {
  constructor(props){
    super(props);
    this.state = {
      branchesList: []
    }

  }
  componentDidMount(){
    fetch('http://localhost:1337/all-branch')
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({branchesList: result})})
    .then(()=>{console.log(this.state.branchesList);})
    .catch((e)=>{console.log(e);});
  }
  render() {
    return (
      <div>
      <BranchesTable values={this.state.branchesList}/>
      </div>
    );
  }
}

export default ViewBranches;

class BranchesTable extends Component{
  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div class="ui grid">
            <div class="four wide column"></div>
            <div class="eight wide column">
              <table class="ui small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
          {
            this.props.values.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Branch_id}</th>
                    <th>{item.Branch_name}</th>
                    <th>{item.Branch_location}</th>
                  </tr>
                )
              }
            )
          }
      </tbody>
    </table>
            </div>
            <div class="four wide column"></div>
          </div>
    <br/>
    <button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
    </h2>
    </div>
    );
  }
}
