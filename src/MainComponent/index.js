import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Map from '../MapContainer';


class Brewery extends Component {
  constructor(){
    super();
    this.state = {
      locations: [],
      count: 0
    }
  }

getBrewData = async () => {
  try {
    const brewData = await fetch('https://api.openbrewerydb.org/breweries?by_city=austin&per_page=50');
    const brewDataJson = await brewData.json();
    return brewDataJson

  } catch(err) {
    return(err)
  }
}
getGeoLocation = async (data,  index) => {
  try {
    const coordinates = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ data.street + 'Austin,+TX&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw');
    const coordinatesJson = await coordinates.json();
    data.latitude = coordinatesJson.results[0].geometry.location.lat;
    data.longitude = coordinatesJson.results[0].geometry.location.lng;
    console.log(this.state.count, 'mirza')
    this.setState(prevState => ({
      locations: [...prevState.locations, data],
      count: prevState.count + 1
    }));

  } catch(err) {
    return(err)
  }
  }
shouldComponentUpdate() {
  if (this.state.count === 33) {
    return true;
  }
  return false;
}

componentDidMount() {

  this.getBrewData().then((data) => {
    for ( let i = 0; i < data.length; i++ ) {
      if(data[i].street.length > 3) {
        const street = data[i].street.split(' ').join('+');
        data[i].street = street;
        this.getGeoLocation(data[i], i)
    }
    }
  }).catch((err) => {
    console.log(err)
  })
}

  render() {

    const tripContainerStyle = {
      marginTop: '45%',
      marginLeft: '37%',
      maxWidth: '400px',
      position: 'relative',
      color: 'black'
    }
    return (
      <div className="App">
          <div className="welcome" >
            <h3>Whats better than a nice, cold beer? A nice, cold beer with the best tacos we could find!</h3>
            <h3>With over 30+ Austin brewery locations across the city, each location has its own story,<br></br> providing unique perspectives on the history and making of off their own specialty.<br></br>
            <br></br>From the historic Celis Brewery to the Sours of Jester King, each of these breweries have a captivating story to tell.</h3>
          </div>
           <div className="mapContainer">
              <Map brewData={this.state.locations}/> 
          </div>
        <div style={tripContainerStyle} className="tripFormContainer"  >
          <h1>Coming Soon: TACOS!!</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSDQD24sbGxeUPE-dvPUMcNr73W4mIAZHZUSVdU01oc3aWv8W9A"/>
        </div>
      </div>
    );
  }
}

export default Brewery;
