import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';

class Buy extends Component {
  constructor(props){
    super(props);
    this.state = {
      productList: [],
      shoppingList: []
    }
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(e){
    console.log(e.target.value);
    this.state.shoppingList.push(e.target.value);
  }

  componentDidMount(){
    fetch('http://localhost:1337/all-product')
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({productList: result})})
    .then(()=>{console.log(this.state.productList);})
    .catch((e)=>{console.log(e);});

  }
  render() {
    return (
      <div>
        <ProductTable values={this.state.productList}/>
      </div>
    );
  }
}

export default Buy;

class ProductTable extends Component{
  render(){
    return(
      <div className="center aligned one column row" id = "centerTitle">
        <h2 className ="ui center aligned icon header">
          <i className ="circular empty star icon"></i>
          <div className = "ui grid">
            <div className = "four wide column"></div>
            <div className = "eight wide column">
              <table className ="ui fixed small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Product Number</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Branch ID</th>
          <th>Buy</th>
        </tr>
      </thead>
      <tbody>
          {
            this.props.values.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Product_number}</th>
                    <th>{item.Product_name}</th>
                    <th>{item.Product_price}</th>
                    <th>{item.Branch_id}</th>
                    <th id="center">
                      <button value = {index} className = "ui inverted button" onClick={this.addProduct}>Buy</button>
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
    <button className = "massive ui inverted button" onClick={()=>{window.location="/"}}>Back to Home</button>
    </h2>
    </div>
    );
  }
}