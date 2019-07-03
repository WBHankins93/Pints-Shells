import React, { Component } from 'react';
import '../App.css';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

  class OtherMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);

    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  getBrewries = async () => {

    const getAllBrewries = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=breweries+in+austin&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw');
    const getAllBrewriesJson = await getAllBrewries.json();
    console.log(getAllBrewriesJson, '235253')
  }

  componentDidMount() {
    this.getBrewries();
  }

  render() {
    const style = {
      position: 'relative',
      width: '100%',
      height: '60%',
      // top: '28%'
    }

    // const markers = this.props.quakeData.map((data, i) => {
    //
    //   return (
    //     <Marker
    //       onClick = { this.onMarkerClick }
    //       title = { 'Changing Colors Garage' }
    //       position = {{ lat: data[0], lng: data[1] }}
    //       name = { 'Changing Colors Garage' }
    //     />
    //   );
    // });

    return (

      <div>
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: 39.309500, lng: -94.915760 }}
      >


        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >

        </InfoWindow>
      </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu_IOBRmOIvlgUmSAD4NXhMuod8h73ja4'
})(OtherMap)
