// Sourced from below.
// https://ui.dev/react-router-v5-protected-routes-authentication/

import { Route, Redirect } from 'react-router-dom';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const PrivateRoute = ( { component: Component, loginAt, ...rest } ) => {
    const { isLoggedIn } = useAuthorization();

    return(
        <Route {...rest} render={(props) => (
              isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{
                pathname: loginAt,
                state: { from: props.location }
            }} />
        ) } />
    );
}

export default PrivateRoute;