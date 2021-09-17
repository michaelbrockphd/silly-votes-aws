import
    appStyles from './App.module.css';

import {
    Provider as StoreProvider } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch } from 'react-router-dom';

import {
    AuthorizationProvider } from '../../contexts/AuthorizationContext';
import
    AppHeader from '../AppHeader';
import
    AppFooter from '../AppFooter';
import
    Campaigns from '../Campaigns';
import
    Login from '../Login';
import
    PrivateRoute from '../PrivateRoute';
import
    Profile from '../Profile';

import AppStore from '../../store';

function App() {
    return (
        <div className={appStyles.pageRoot}>
            <AuthorizationProvider>
                <AppHeader />

                <StoreProvider store={AppStore}>
                    <div className={appStyles.pageContent}>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/campaigns" />
                                </Route>
                                <Route exact path="/campaigns" component={Campaigns} />
                                <Route exact path="/login" render={(props) => <Login returnUrl="/profile" />} />
                                <PrivateRoute exact path="/profile" loginAt="/login" component={Profile} />
                            </Switch>
                        </Router>
                    </div>
                </StoreProvider>

                <AppFooter />
            </AuthorizationProvider>
        </div>
    );
}

export default App;
