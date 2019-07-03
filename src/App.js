import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import BrewTour from './BrewTour';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Brewery from './MainComponent';
import Register from './Register';
import OtherMap from './OtherMap';

class App extends Component {


  render() {

    if (process.env.NODE_ENV !== 'production') {
      const {whyDidYouUpdate} = require('why-did-you-update');
      whyDidYouUpdate(React);
    }

    return (

      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={Brewery}/>
          <Route exact path="/brewTour" component={BrewTour} />
          <Route exact path="/OtherMap" component={OtherMap} />
        </Switch>
      </div>
    );
  }
}

export default App;
