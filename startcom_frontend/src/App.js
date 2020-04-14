import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import RegisterBI from './components/businessideas/RegisterBI';
import theme from './theme/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/anonymoususers/HomePage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                      <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                      <Route exact path={'/'} render={(props) => <HomePage {...props} />} />

                    </div>
                </ThemeProvider>
          </Provider>
      </BrowserRouter>
      
     
    );
  }
 
}

export default App;
