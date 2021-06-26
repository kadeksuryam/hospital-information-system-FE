import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Logout from './pages/Logout/Logout.js'
import Signup from './pages/Signup/Signup.js'
import NavbarC from './components/Navbar/Navbar.js'
import Appointment from './pages/Appointment/Appointment.js'
import Home from './pages/Home/Home.js'
import Doctor from './pages/Doctor/Doctor.js'
import { useState, useEffect } from 'react'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('JWT_token')
    const authUserID = localStorage.getItem('authUserID')
    const userType = localStorage.getItem('userType')

    if(token && authUserID && userType){
      setIsLoggedIn(true)
    }
  },[])

  return(
     <Router>
       <NavbarC isLoggedIn={isLoggedIn}/>
       <Switch>
          <Route path="/doctors">
            <Doctor/>
          </Route>
          <Route path="/appointments/:id">
            <Appointment />
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route path="/logout">
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
       </Switch>
     </Router>    
  )
}

export default App;
