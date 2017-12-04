import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class Buy extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      productList: [],
      searchQuantity: 0,
      inputBranch: 0,
      totalAmount: 0,
      totalRewards: 0
    }
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBranch = this.handleBranch.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }

  checkOut(e){
    alert("Total: " + this.state.totalAmount);
    /*add to transactions*/
    var cardNumber = prompt("Enter card number: ");

    fetch('http://localhost:1337/add-transaction/cash='+this.state.totalAmount+"&accumulated="+Math.floor(this.state.totalAmount/50)+"&card="+cardNumber+"&branch="+this.state.searchBranch)
    .then((response) => {return response.json()})
    .then((result)=> {})
    .then(()=>{})
    .catch((e)=>{console.log(e);});


    window.location = "/";
  }

  addToCart(e){
    if (this.state.productList[0].Product_stock == 0){
      alert("Product not available!");
    }else{
      if (this.state.searchQuantity > this.state.productList[0].Product_stock){
        alert("Number of stocks not enough");
      }else{
        console.log(this.state.searchQuantity + "huhuhuhuhu");
        console.log(this.state.productList[0].Product_price);
        console.log(this.state.searchQuantity*this.state.productList[0].Product_price);
        this.state.totalAmount = this.state.totalAmount + (this.state.searchQuantity*this.state.productList[0].Product_price);
        console.log(this.state.totalAmount);

        fetch("http://localhost:1337/buy-product-by-branch/branch="+this.state.searchBranch+"&product="+this.state.searchQuery+"&quantity="+this.state.searchQuantity)
        .then((response) => {return response.json()})
        .then((result)=> {this.setState({productList: result})})
        .then(()=>{console.log(this.state.productList)})
        .catch((e)=>{console.log(e);});
      }
    }

  }

  componentDidMount(){
    fetch('http://localhost:1337/all-product')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList)})
    .catch((e)=>{console.log(e);});
  }

  handleBranch(e){
    this.setState({searchBranch: e.target.value});
    fetch("http://localhost:1337/show-products-by-branch/id="+e.target.value)
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList)})
    .then(()=>{this.setState(this.state)})
    .catch((e)=>{
      console.log(e);
    })
  }


  handleQuantity(e){
    this.setState({searchQuantity: e.target.value});
  }

  handleSearch(e){
    this.setState({searchQuery: e.target.value});
    fetch('http://localhost:1337/search-product-by-id/id='+e.target.value)
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList)})
    .then(()=>{this.setState(this.state)})
    .catch((e)=>{
      console.log(e);
    })
  }

  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "ui grid">
            <div className = "four wide column"></div>
            <div className = "eight wide column">
            <div className = "ui small input">
              <input type="number" onChange={this.handleBranch} value = {this.state.searchBranch} placeholder="Enter Branch..."/>
            </div>
            <div className = "ui small input">
              <input type="text" onChange={this.handleSearch} value = {this.state.searchQuery} placeholder="Search Product Number..."/>
            </div>
            <div className = "ui small input">
              <input type="number" onChange={this.handleQuantity} value = {this.state.searchQuantity} placeholder="Enter Quantity..."/>
            </div>
            <button className = "massive ui inverted button" onClick={this.addToCart}>Add to Cart</button>
              <table className = "ui small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Product Number</th>
          <th>Branch ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Stock</th>

        </tr>
      </thead>
      <tbody>
          {
            this.state.productList.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Product_number}</th>
                    <th>{item.Branch_id}</th>
                    <th>{item.Product_name}</th>
                    <th>{item.Product_price}</th>
                    <th>{item.Product_stock}</th>
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
    <button className = "massive ui inverted button" onClick={this.checkOut}>Checkout</button>
    </h2>
    </div>
    );
  }
}

export default Buy;