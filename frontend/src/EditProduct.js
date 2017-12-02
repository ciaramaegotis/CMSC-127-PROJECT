import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class EditProducts extends Component{
  constructor(props){
    super(props);
    this.state = {
      productNum: 0,
      branchList: [],
      currentBranch: 0,
      productList: [],
      productPrice: 0,
      ProductName: '',
      branchID: 0
    }
    this.handleProductNum = this.handleProductNum.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleName = this.handleName.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.handleBranchID = this.handleBranchID.bind(this);
  }

  handleBranchID(e){
    this.setState({branchID: e.target.value});
  }

  handleName(e){
    this.setState({ProductName: e.target.value});
  }

  handlePrice(e){
    this.setState({productPrice: e.target.value});
  }



  handleProductNum(e){
    this.setState({productNum: e.target.value});
  }

  searchProduct(e){
    var i = 0;
    var isFound = false;
    for(i = 0; i < this.state.productList.length;++i){
      console.log(this.state.productList[i].Product_number + "HAHAHAHA" + this.state.productNum);
      if (this.state.productList[i].Product_number == this.state.productNum){
        this.setState({ProductName: this.state.productList[i].Product_name, productPrice: this.state.productList[i].Product_price, branchID: this.state.productList[i].Branch_id});
        isFound = true;
      }
    }
    if (isFound == false){
      console.log(this.state.productNum);
      alert('Product not found.');
    }
  }

  componentDidMount(){
    fetch('http://localhost:1337/all-branch')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({branchList: result})})
    .then(()=>{console.log(this.state.branchList)})
    .catch((e)=>{console.log(e);});

    fetch('http://localhost:1337/all-product-zero')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList)})
    .catch((e)=>{console.log(e);});
  }

  render() {
    return (
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>

          Product Information
          <br/>
          <br/>
          <div className = "ui three column very relaxed grid">
          <div className = "column"></div>
          <div className = "column">
          <div className = "ui mini input">
            <input type="number" value = {this.state.productNum} onChange={this.handleProductNum} placeholder="Enter product number.."/>
          </div>
          <br/>
          <br/>
          <button  className = "large ui inverted button" onClick = {this.searchProduct}> Search </button>


          <form className = "ui form">
  <h2 className = "ui dividing header">Product Information</h2>
  <div className = "field">
      <h2 className = "ui dividing header">OR</h2> 
      <div className = "ui grid">
        <div className = "column">
          <input type="text" value = {this.state.ProductName} onChange={this.handleName} placeholder="Product Name"/>
        </div>
      </div> 
      <div className = "ui grid">
        <div className = "eight wide column">
          <h3>Price</h3>
        </div>
        <div className = "eight wide column">
          <h3>Branch ID</h3>
        </div>
      </div> 
      <div className = "ui grid">
        <div className = "eight wide column">
          <input type="number" onChange={this.handlePrice} value = {this.state.productPrice} placeholder="Price"/>
        </div>
        <div className = "eight wide column">
          <input type="number" onChange={this.handleBranchID} value={this.state.branchID} placeholder = "Branch ID"/>
        </div>
      </div>    
  </div>   
</form>
<div className = "ui grid">
  <div className = "four wide column"><button className = "massive ui red inverted button" onClick={()=>{window.location="/"}}>Delete</button></div>
  <div className = "six wide column">
  </div>
  <div className = "six wide column"><button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Save</button>
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

export default EditProducts;

