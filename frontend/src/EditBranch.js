import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditBranch extends Component {
  constructor(props){
    super(props);
    this.state = {
      branchList: [],
      branchID: 0,
      branchLocation: '',
      branchName: ''
    }
    this.searchBranch = this.searchBranch.bind(this);
    this.addBranch = this.addBranch.bind(this);
    this.updateBranch = this.updateBranch.bind(this);
    this.deleteBranch = this.deleteBranch.bind(this);
    this.handleBranchID = this.handleBranchID.bind(this);
    this.handleBranchLocation = this.handleBranchLocation.bind(this);
    this.handleBranchName = this.handleBranchName.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:1337/all-branch')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({branchList: result})})
    .then(()=>{console.log(this.state.branchList)})
    .catch((e)=>{console.log(e);});
  }

  searchBranch(e){
    var i = 0;
    var isFound = false;
    for(i=0;i<this.state.branchList.length;++i){
      if (this.state.branchID == this.state.branchList[i].Branch_id){
        console.log("Found the branch!");
        isFound = true;
        this.setState({branchName: this.state.branchList[i].Branch_name, branchLocation: this.state.branchList[i].Branch_location});
      }
    }
    if (isFound == false){
      alert('Branch not found.');
    }
  }

  addBranch(e){
    fetch("http://localhost:1337/add-branch/branchName="+this.state.branchName+"&location="+this.state.branchLocation)
    .then((response)=>{return response.json()})
    .then((result)=>{console.log(result)})
    .catch((e)=>{console.log(e)})
    window.location = "/";
  }

  updateBranch(e){
    if (this.state.branchID == 0){
      this.addBranch();
    }else{
      fetch("http://localhost:1337/update-branch-by-id/branch="+this.state.branchID+"&branchName="+this.state.branchName+"&branchLocation="+this.state.branchLocation)
      .then((response)=>{return response.json()})
      .then((result)=>{console.log(result)})
      .catch((e)=>{console.log(e)})
      window.location = "/";
    }
  }

  deleteBranch(e){
    fetch('http://localhost:1337/delete-branch/branch='+this.state.branchID)
    .then((response)=>{return response.json()})
    .then((result)=>{console.log(result)})
    .catch((e)=>{console.log(e)})
    window.location = "/";
  }

  handleBranchID(e){
    this.setState({branchID: e.target.value});
  }

  handleBranchName(e){
    this.setState({branchName: e.target.value});
  }

  handleBranchLocation(e){
    this.setState({branchLocation: e.target.value});
  }
  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          Branch Information
          <br/>
          <br/>
          <div className = "ui three column very relaxed grid">
          <div className = "column"></div>
          <div className = "column">
          <div className = "ui mini input">
            <input type="number" value = {this.state.branchID} onChange={this.handleBranchID} placeholder="Enter branch ID.."/>
          </div>
          <br/>
          <br/>
          <button  className = "large ui inverted button" onClick = {this.searchBranch}> Search </button>
          <form className = "ui form">
  <div className = "field">
  <br/>
      <h2 className = "ui dividing header">OR</h2>

      <div className = "field">
        <input type="text" value = {this.state.branchName} onChange={this.handleBranchName} placeholder="Branch Name"/>
      </div>
      <div className = "field">
        <input type="text" value = {this.state.branchLocation} onChange={this.handleBranchLocation} placeholder="Branch Location"/>
      </div>
      
  </div>   
</form>
 <br/>
 <div className = "ui grid">
  <div className = "four wide column"><button className = "massive ui red inverted button" onClick={this.deleteBranch}>Delete</button></div>
  <div className = "six wide column">
  </div>
  <div className = "six wide column"><button className = "massive ui inverted button" onClick={this.updateBranch}>Save</button>
  </div>
  <div className = "four wide column"></div>
</div>
</div>
</div>         
        </h2>

      </div>
    );
  }
}

export default EditBranch;
