import React, { Component } from 'react';
import {Provider} from 'react-redux';
import themeFile from "./utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import store  from './store'
import { BrowserRouter, Route} from 'react-router-dom';

//Import pages
import RegisterBI from './components/businessideas/registerbusinessidea/RegisterBI';
import HomePage from './components/anonymoususers/homepage/HomePage';
import Authentication from './components/authentication/Authentication';
import Login from './components/authentication/login/Login';
import SignUp from './components/authentication/register/SignUp';
import DisplayBIS from "./components/businessideas/displaybusinessideas/DisplayBIS";

class App extends Component {
  render() {
  const theme = createMuiTheme(themeFile);

    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                      <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                      <Route exact path={'/'} render={(props) => <HomePage {...props} />} />
                      <Route exact path={'/auth'} render={(props) => <Authentication {...props} />} />
                      <Route exact path={'/login'} render={(props) => <Login {...props} />} />
                      <Route exact path={'/signup'} render={(props) => <SignUp {...props} />} />
                    <Route exact path={'/displayBIS'} render={(props) => <DisplayBIS {...props} />} />
                </ThemeProvider>
          </Provider>
      </BrowserRouter>

    );
  }

}

export default App;

