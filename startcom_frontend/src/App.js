import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import RegisterBI from './components/businessideas/RegisterBI';
import BIS from './components/businessideas/BIS';
import theme from './theme/theme'
import { ThemeProvider } from '@material-ui/core/styles';
class App extends Component {
  render() {
    return (
      <Provider store={store }>
        <ThemeProvider theme={theme}>
        <div className="App">
          <RegisterBI/>
          <BIS />
        </div>
        </ThemeProvider>
      </Provider>
     
    );
  }
 
}

export default App;
