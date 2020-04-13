import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import RegisterBI from './components/businessideas/RegisterBI';
import BIS from './components/businessideas/BIS';

class App extends Component {
  render() {
    return (
      <Provider store={store }>
        <div className="App">
          <RegisterBI/>
          <BIS />
        </div>
      </Provider>
     
    );
  }
 
}

export default App;
