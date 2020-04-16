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
}

export default App;
