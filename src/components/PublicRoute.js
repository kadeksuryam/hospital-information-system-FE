import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../utils/isLogin'

const PublicRoute = ({component: Component, restricted, setIsLoggedIn, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/doctors" />
            : <Component setIsLoggedIn={setIsLoggedIn}  props={props} />
        )} />
    )
}

export default PublicRoute