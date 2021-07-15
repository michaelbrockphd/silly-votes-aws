import appStyles from './App.module.css';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { AuthorizationProvider } from '../../contexts/AuthorizationContext';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import Campaigns from '../Campaigns';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';

function App() {
    return (
        <div className={appStyles.pageRoot}>
            <AuthorizationProvider>
                <AppHeader />

                <div className={appStyles.pageContent}>
                    <Router basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/campaigns" />
                            </Route>
                            <Route exact path="/campaigns" component={Campaigns} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/profile" loginAt="/login" component={Profile} />
                        </Switch>
                    </Router>
                </div>

                <AppFooter />
            </AuthorizationProvider>
        </div>
    );
}

export default App;
