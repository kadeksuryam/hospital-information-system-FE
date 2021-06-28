import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../utils/isLogin'

const PrivateRoute = ({component: Component, setIsLoggedIn, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" setIsLoggedIn={setIsLoggedIn}/>
        )} />
    )
}

export default PrivateRoute