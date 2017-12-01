import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditCustomer extends Component {
  constructor(props){
    super(props);
    this.state = {
      branchList: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:1337/all-branch')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({branchList: result})})
    .then(()=>{console.log(this.state.branchList)})
    .catch((e)=>{console.log(e);});
  }

  render(){
    return(
      <div>
        <CustomerTable values = {this.state.branchList}/>
      </div>
    );
  }
}

export default EditCustomer;

class CustomerTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      cardNumber: '',
      customerName: '',
      rewardPoints: '',
      address: '',
      branchID: 1
    }
    this.searchCustomer = this.searchCustomer.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.handleCardNumber = this.handleCardNumber.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleBranch = this.handleBranch.bind(this);
  }
  componentDidMount(){
    fetch('http://localhost:1337/all-customer')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({customerList: result})})
    .then(()=>{console.log(this.state.customerList)})
    .catch((e)=>{console.log(e);});

  }

  handleBranch(e){
    this.setState({branchID: e.target.value});
    console.log("received branch change" + e.target.value);
  }

  handleAddress(e){
    this.setState({address: e.target.value});
    console.log("received address change");
  }

  handleName(e){
    this.setState({customerName: e.target.value});
    console.log("received name");
  }
  handleCardNumber(e){
    this.setState({cardNumber: e.target.value});
    console.log("received card number");
    console.log(this.state.customerList);
  }
  searchCustomer(e){
    var i = 0;
    console.log(this.state.customerList);
    for(i = 0; i < this.state.customerList.length;++i){
      console.log(this.state.cardNumber + " " + this.state.customerList[i].Card_number);
      if(this.state.cardNumber == this.state.customerList[i].Card_number){
        break;
      }
    }
    try{
      this.setState({customerName: this.state.customerList[i].Customer_name, address: this.state.customerList[i].Address, branchID: this.state.customerList[i].Branch_id});
    }catch(e){
      alert("Customer not found.");
    }
    
  }

  addCustomer(e){
    console.log(this.state.branchID + "HAHAHAHAHAHAHAHAHAHA");
    console.log('http://localhost:1337/new-customer/name='+this.state.customerName+"&address="+this.state.address+"&branch="+this.state.branchID);
    fetch('http://localhost:1337/new-customer/name='+this.state.customerName+"&address="+this.state.address+"&branch="+this.state.branchID)
    .then((response)=>{return response.json()})
    .catch((e)=>{console.log(e)})
    console.log(this.state.branchID + "HAHAHAHAHAHAHAHAHAHA");
  }

  updateCustomer(e){
    if (this.state.cardNumber == ''){
      this.addCustomer();
      alert("Added a new customer.");
    }else{
      
      fetch('http://localhost:1337/update-customer/name='+this.state.customerName+"&address="+this.state.address+"&branch="+this.state.branchID+"&id="+this.state.cardNumber)
      .then((response)=>{return response.json()})
      .catch((e)=>{console.log(e)})
      alert("Updated a registered user.");
    }
    window.location = "/";
  }

  deleteCustomer(e){
    console.log('http://localhost:1337/delete='+this.state.cardNumber);
    fetch('http://localhost:1337/delete='+this.state.cardNumber)
    .then((response)=>{return response.json()})
    .then((result)=>{console.log("success in the query");})
    .catch((e)=>{
      console.log("Not Found!");
    })
    window.location="/";
  }
  render() {
    console.log(this.state);
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          Customer Infromation
          <br/>
          <br/>
          <div className = "ui three column very relaxed grid">
          <div className = "column"></div>
          <div className = "column">
          <div className = "ui mini input">
            <input type="number" value = {this.state.cardNumber} onChange={this.handleCardNumber} placeholder="Enter card number.."/>
          </div>
          <br/>
          <br/>
          <button  className = "large ui inverted button" onClick = {this.searchCustomer}> Search </button>
          <form className = "ui form">
  <div className = "field">
  <br/>
      <h2 className = "ui dividing header">OR</h2>

      <div className = "field">
        <input type="text" value = {this.state.customerName} onChange={this.handleName} placeholder="Name"/>
      </div>
   
  </div>
  <div className = "field">
    <div className = "fields">
      <div className = "twelve wide field">
        <input type="text" value = {this.state.address} onChange={this.handleAddress} placeholder="Permanent Address Address"/>
      </div>

      <div className = "four wide field">
        <div className = "field">
          <select className = "ui fluid search dropdown" onChange={this.handleBranch}>
            {
              this.props.values.map(
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
    </div>    
</form>
<div className = "ui grid">
  <div className = "four wide column"><button className = "massive ui red inverted button" onClick={this.deleteCustomer}>Delete</button></div>
  <div className = "six wide column">
  </div>
  <div className = "six wide column"><button className = "massive ui inverted button" onClick={this.updateCustomer}>Save</button>
  </div>
  <div className = "four wide column"></div>
</div>


</div>
</div>
<div className = "column"></div>
          
        </h2>

      </div>
    );
  }
}

