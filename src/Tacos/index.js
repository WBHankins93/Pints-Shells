import React, { Component } from 'react';
import TacoMapContainer from '../TacoMapContainer';

class Tacos extends Component {
  constructor(){
    super();

    this.state = {
      tacos: [],
      tacoPos: []
    }
  }

//get tacos

  getTacos = async () => {
    try {


      const tacosData = await fetch('https://developers.zomato.com/api/v2.1/search?lat=30.3005&lon=-97.7388&radius=1609.34&count=10%category=taco&sort=real_distance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-key': 'b444031ab9fe38897f23e9ccf030c753'
        }
      });
      const tacosDataJson = await tacosData.json();
      console.log(tacosDataJson, 'TACOS')
      return tacosDataJson;
    } catch(err) {
      return(err)
    }
  }

  componentDidMount(){
    this.getTacos().then((item) => {


    }).catch((err) => {
      console.log(err)
    })
  }

  render(){
    console.log(this.state, 'STATE CHECK')
    return(
      <TacoMapContainer pos={this.props.pos}/>
    );
  }
}

export default Tacos;
