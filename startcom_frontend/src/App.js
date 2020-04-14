import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import RegisterBI from './components/businessideas/RegisterBI';
import BIS from './components/businessideas/BIS';
import theme from './theme/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                      <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                    </div>
                </ThemeProvider>
          </Provider>
      </BrowserRouter>
      
     
    );
  }
 
}

export default App;
