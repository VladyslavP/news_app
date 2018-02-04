import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router';

import Main from './Components/components/MainRouter';


class RootComponent extends Component {
  render() {
    return (

        <div className="App">
            <Switch>
                <Main/>
            </Switch>
        </div>
    );
  }
}

export default RootComponent;
