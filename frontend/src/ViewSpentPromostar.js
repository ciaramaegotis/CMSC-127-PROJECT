import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class ViewSpentPromostar extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      spentPromoList: []
    }

  }

  componentDidMount(){
    fetch('http://localhost:1337/all-spent-promostar')
    .then((response) => {return response.json()})
    .then((result)=> {this.setState({spentPromoList: result})})
    .then(()=>{console.log(this.state.spentPromoList)})
    .catch((e)=>{console.log(e);});
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
              <input type="text" onChange={this.handleSearch} value = {this.state.searchQuery} placeholder="Search name..."/>
            </div>
              <table className = "ui small selectable celled inverted blue table">
      <thead>
        <tr>
          <th>Card Number</th>
          <th>Transaction Number</th>
          <th>Control Number</th>
        </tr>
      </thead>
      <tbody>
          {
            this.state.spentPromoList.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Card_number}</th>
                    <th>{item.Transaction_number}</th>
                    <th>{item.Control_number}</th>
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

export default ViewSpentPromostar;