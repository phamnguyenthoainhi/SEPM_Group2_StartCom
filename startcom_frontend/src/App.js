import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux';
import themeFile from "./utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import store  from './store'
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

const theme = createMuiTheme(themeFile);

import RegisterBI from './components/businessideas/RegisterBI';
// import theme from './theme/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/anonymoususers/HomePage';
class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store }>
                    <Router>
                        <Navbar/>
                        <Footer/>
                    </Router>

                </Provider>
            </ThemeProvider>
        );
    }
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
