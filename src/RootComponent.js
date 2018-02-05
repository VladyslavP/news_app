import React, { Component } from 'react';
import { Switch } from 'react-router';

import Main from './News/components/MainRouter';

class RootComponent extends Component {
  render() {
    return (
        <div className='App'>
            <Switch>
                <Main/>
            </Switch>
        </div>
    );
  }
}

export default RootComponent;
