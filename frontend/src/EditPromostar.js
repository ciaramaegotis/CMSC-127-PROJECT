import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class EditPromostar extends Component {
  constructor(props){
    super(props);
    this.state = {
      controlNumber: 0,
      amount: 0,
      expireDate: '',
      productNumber: 0,
      branchID: 0,
      promoList: []
    }

    this.handleControlNumber = this.handleControlNumber.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleExpireDate = this.handleExpireDate.bind(this);
    this.handleProductNumber = this.handleProductNumber.bind(this);
    this.handleBranchID = this.handleBranchID.bind(this);
    this.addPromostar = this.addPromostar.bind(this);
    this.deletePromostar = this.deletePromostar.bind(this);
    this.updatePromostar = this.updatePromostar.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:1337/all-promostar")
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({promoList: result})})
    .catch((e)=>{console.log(e)})
  }

  handleSearch(e){
    var i = 0;
    var isFound = false;
    for(i = 0; i < this.state.promoList.length;++i){
      if (this.state.promoList[i].Control_number == this.state.controlNumber){
        isFound = true;
        this.setState({amount: this.state.promoList[i].Amount, expireDate: (this.state.promoList[i].Expire_date).substring(0, 10), productNumber: this.state.promoList[i].Product_number, branchID: this.state.promoList[i].Branch_id})
      }
    }
    if (isFound == false){
      alert("Promolist not found!");
    }
  }

  handleControlNumber(e){
    this.setState({controlNumber: e.target.value});
  }

  handleAmount(e){
    this.setState({amount: e.target.value});
  }

  handleExpireDate(e){
    this.setState({expireDate: e.target.value});
  }

  handleProductNumber(e){
    this.setState({productNumber: e.target.value});
  }

  handleBranchID(e){
    this.setState({branchID: e.target.value});
  }

  addPromostar(e){
    fetch("http://localhost:1337/add-promostar/amount="+this.state.amount+"&productNum="+this.state.productNumber+"&branch="+this.state.branchID+"&expireDate="+this.state.expireDate)
    .then((response)=>{return response.json()})
    .then((result)=>{console.log(result)})
    .catch((e)=>{console.log(e)})
    window.location = "/";
  }

  updatePromostar(e){
    if (this.state.controlNumber == 0){
      this.addPromostar(); 
    }else{
      fetch("http://localhost:1337/edit-promostar/amount="+this.state.amount+"&productNum="+this.state.productNumber+"&branch="+this.state.branchID+"&expireDate="+this.state.expireDate+"&control="+this.state.controlNumber)
      .then((response)=>{return response.json()})
      .then((result)=>{console.log(result)})
      .catch((e)=>{console.log(e)})
      window.location = "/";
    }
  }

  deletePromostar(e){

  }

  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "ui three column very relaxed grid">
          <div className = "column"></div>
          <div className = "column">


          <div className = "ui mini input">
        <input type="number" value={this.state.controlNumber} onChange = {this.handleControlNumber} placeholder="Enter control number.."/>
      </div>
      <br/>
      <div className = "field">
        <button className = "large ui inverted button" onClick={this.handleSearch}> Search </button>
      </div>


          <form className = "ui form">
  <h2 className = "ui dividing header">Promostar Information</h2>
  <div className = "field">
      <h2 className = "ui dividing header">OR</h2> 
      <div className = "ui grid">
        <div className = "eight wide column">
          <input type="number" value={this.state.amount} onChange = {this.handleAmount} placeholder="Amount"/>
        </div>
        <div className = "eight wide column">
          <input type="date" value={this.state.expireDate} onChange={this.handleExpireDate} placeholder="Expiration Date"/>
        </div>
      </div> 
      <div className = "ui grid">
        <div className = "eight wide column">
          <input type="number" value={this.state.productNumber} onChange={this.handleProductNumber} placeholder="Product Control Number"/>
        </div>
        <div className = "eight wide column">
          <input type="number" value={this.state.branchID} onChange={this.handleBranchID} placeholder="Branch ID"/>
        </div>
      </div>    
  </div>   
</form>
<div className = "ui grid">
  <div className = "four wide column"><button className = "massive ui red inverted button" onClick={()=>{window.location="/"}}>Delete</button></div>
  <div className = "six wide column">
  </div>
  <div className = "six wide column"><button className = "massive ui inverted button" onClick={this.updatePromostar}>Save</button>
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

export default EditPromostar;
