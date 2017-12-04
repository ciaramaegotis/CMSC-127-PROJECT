import React, { Component } from 'react';
import './assets/semanticUI/semantic.min.css';
import './assets/main.css';


class ViewPromostar extends Component{
  constructor(props){
    super(props);
    this.state = {
      promoList: []
    }

  }
  componentDidMount(){
    fetch('http://localhost:1337/all-promostar')
    .then((response)=>{return response.json()})
    .then((result)=>{this.setState({promoList: result})})
    .then(()=>{console.log(this.state.promoList);})
    .catch((e)=>{console.log(e);});
  }
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
          <th>Control Number</th>
          <th>Amount</th>
          <th>Expire Date</th>
          <th>Product Number</th>
          <th>Branch ID</th>
        </tr>
      </thead>
      <tbody>
          {
            this.state.promoList.map(
              (item, index)=>{
                return(
                  <tr key={index}>
                    <th>{item.Control_number}</th>
                    <th>{item.Amount}</th>
                    <th>{item.Expire_date.substring(0, 10)}</th>
                    <th>{item.Product_number}</th>
                    <th>{item.Branch_id}</th>
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
export default ViewPromostar;
