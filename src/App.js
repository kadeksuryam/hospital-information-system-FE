import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Logout from './pages/Logout/Logout.js'
import Signup from './pages/Signup/Signup.js'
import NavbarC from './components/Navbar/Navbar.js'
import Appointment from './pages/Appointment/Appointment.js'
import Home from './pages/Home/Home.js'
import Doctor from './pages/Doctor/Doctor.js'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { useState } from 'react'
import NotFound from './pages/NotFound/NotFound.js'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return(
     <Router>
       <NavbarC isLoggedIn={isLoggedIn}/>
       <Switch>
          <PublicRoute restricted={false} component={Home} exact path="/" />
          <PublicRoute restricted={false} component={Doctor} path="/doctors" />
          <PrivateRoute component={Appointment} path="/appointments/:doctorID" />
          <PublicRoute restricted={true} component={Login} setIsLoggedIn={setIsLoggedIn} path="/login"/>
          <PublicRoute restricted={false} component={Logout}  setIsLoggedIn={setIsLoggedIn} path="/logout" />
          <PublicRoute restricted={true} component={Signup} path="/signup" setIsLoggedIn={setIsLoggedIn} />
          <PublicRoute restricted={false} component={NotFound} path="*" />
       </Switch>
     </Router>    
  )
}

export default App;
