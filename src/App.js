import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Signup from './pages/Signup/Signup.js'
import NavbarC from './components/Navbar/Navbar.js'
import Appointment from './pages/Appointment/Appointment.js'

const App = () => {
  return(
     <Router>
       <NavbarC/>
       <Switch>
          <Route path="/appointment">
            <Appointment />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
          </Route>
       </Switch>
     </Router>    
  )
}

export default App;
