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
      branchID: 0,
      stock: 0
    }
    this.handleStock = this.handleStock.bind(this);
    this.handleProductNum = this.handleProductNum.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleName = this.handleName.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.handleBranchID = this.handleBranchID.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  handleStock(e){
    this.setState({stock: e.target.value});
  }

  deleteProduct(e){
    fetch("http://localhost:1337/delete-product-by-id-and-branch/id=" + this.state.productNum +"&branch="+this.state.branchID)
    .then((response)=>{return response.json()})
    .then((result)=>{alert("You have deleted a product.")})
    .catch((e)=>{console.log("Error in the query. Check the dependencies.")})
    window.location = "/";
  }

  updateProduct(e){
    if (this.state.productNum == 0){
      this.addProduct();
    }else{
      fetch("http://localhost:1337/update-product-by-id/id="+this.state.productNum+"&product="+this.state.ProductName+"&stock="+this.state.stock+"&price="+this.state.productPrice+"&branch="+this.state.branchID)
      .then((response)=>{return response.json()})
      .then((result)=>{console.log(result)})
      .catch((e)=>{console.log(e)})
      alert('You have successfully updated a product.');
      window.location = "/";
    }
  }

  addProduct(e){
    fetch("http://localhost:1337/add-product/product="+this.state.ProductName+"&stock="+this.state.stock+"&price="+this.state.productPrice+"&branch="+this.state.branchID)
    .then((response)=>{return response.json()})
    .then((result)=>{console.log(result)})
    .catch((e)=>{console.log(e)})
    alert('You have successfully added a product.');
    window.location = "/";
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
        this.setState({ProductName: this.state.productList[i].Product_name, productPrice: this.state.productList[i].Product_price, branchID: this.state.productList[i].Branch_id, stock: this.state.productList[i].Product_stock});
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
  <div className = "field">
      <h2 className = "ui dividing header">OR</h2> 
      <div className = "ui grid">
        <div className = "column">
          <input type="text" value = {this.state.ProductName} onChange={this.handleName} placeholder="Product Name"/>
        </div>
      </div> 
      <h3>Number of Stocks</h3>
      <div className = "column">
          <input type="number" value = {this.state.stock} onChange={this.handleStock} placeholder="Number of Stocks"/>
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
  <div className = "four wide column"><button className = "massive ui red inverted button" onClick={this.deleteProduct}>Delete</button></div>
  <div className = "six wide column">
  </div>
  <div className = "six wide column"><button className = "massive ui inverted button" onClick={this.updateProduct}>Save</button>
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

