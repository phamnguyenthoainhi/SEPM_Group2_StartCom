import React, { Component } from 'react';
import {Provider} from 'react-redux';
import themeFile from "./utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import store  from './store'
import RegisterBI from './components/businessideas/RegisterBI';
import Authentication from './components/authentication/Authentication';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/anonymoususers/HomePage';

const theme = createMuiTheme(themeFile);


class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Route exact path="/authentication" component={Authentication}/>
                    <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                    <Route exact path={'/'} render={(props) => <HomePage {...props} />} />
                </ThemeProvider>
          </Provider>
      </BrowserRouter>

    );
  }

}

export default App;
