import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class Buy extends Component{
  constructor(props){
    super(props);
    this.state = {
      shoppingList: [],
      productList: [],
      BranchID: 0
    }
    this.checkOut = this.checkOut.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.setBranch = this.setBranch.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:1337/all-product')
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList);})
    .catch((e)=>{console.log(e);});

  }

  setBranch(e){
    this.setState({BranchID: e.target.value});
    fetch('http://localhost:1337/show-products-by-branch/id='+e.target.value)
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList)})
    .catch((e)=>{console.log(e)})
  }

  addProduct(e){
    if (this.state.BranchID == 0){
      alert('You can only buy from one branch.');
    }else{
        console.log(e.target.value);
        this.state.shoppingList.push(e.target.value);
        fetch("http://localhost:1337/buy-product-by-branch/branch="+this.state.BranchID+"&product="+e.target.value)
        .then((response)=>{return response.json()})
        .then((result)=>{this.setState({productList: result})})
        .catch((e)=>{
          console.log(e);
          alert('Make sure you have the right branch and product.');
        })
    }
  }

  checkOut(e){
    console.log(this.state.shoppingList);
  }

  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <button className = "massive ui red inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
          <button className = "massive ui red inverted button" onClick={this.checkOut}>Checkout</button>
          <div class="ui input">
            <input type="text" placeholder="Branch Number" onChange={this.setBranch}/>
          </div>
          <div className = "ui grid">
            <div className = "four wide column"></div>
            <div className = "eight wide column">
              <table className ="ui fixed small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Items Left</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Branch ID</th>
          <th>Buy</th>
        </tr>
      </thead>
      <tbody>
          {
            this.state.productList.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Product_stock}</th>
                    <th>{item.Product_name}</th>
                    <th>{item.Product_price}</th>
                    <th>{item.Branch_id}</th>
                    <th id="center">
                      <button value = {item.Product_number} className = "ui inverted button" onClick={this.addProduct}>Buy</button>
                    </th>
                  </tr>
                )
              }
            )
          }
      </tbody>
    </table>
            </div>
            <div className = "four wide column"></div>
          </div>
    <br/>
    </h2>
    </div>
    );
  }
}

export default Buy;