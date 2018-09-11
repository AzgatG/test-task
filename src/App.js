import React, { Component } from 'react';
import moment from 'moment';
import jstz from 'jstz';

import logo from './logo.svg';
import './App.css';


const LIMITS = {
  MAX: 10,
  MIN: -10,
}


class App extends Component {
  constructor(props) {
    super(props);
      
    this.timezone = jstz.determine();

    this.state = {
      skipDays: 0
    }
  }

  handleSkipDays = (skip) => () => {
    this.setState({skipDays: this.state.skipDays + skip});
  }
  
  handleReset = () => {
    this.setState({skipDays: 0});
  }

  render() {
    const {skipDays} = this.state;
    
    const date = moment().add(skipDays, 'day').format('dddd DD MMMM YYYY');

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Test App</h1>
        </header>
        <div className="Test">
          <button onClick={this.handleReset} disabled={skipDays === 0}>Today</button>
          <button onClick={this.handleSkipDays(-1)} disabled={skipDays <= LIMITS.MIN}>Left</button>
          <div style={{'color': skipDays === 0 ? 'red': ''}}>{date.toString()}</div>
          <button onClick={this.handleSkipDays(1)} disabled={skipDays >= LIMITS.MAX}>Right</button>
          <div>{this.timezone.name()}</div>
        </div>
      </div>
    );
  }
}

export default App;
