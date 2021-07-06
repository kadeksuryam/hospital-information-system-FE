import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isLogin } from '../../utils/isLogin'
import './Navbar.css'

const NavbarC = ({isLoggedIn}) => {
    return(
        <Navbar sticky="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>HIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/doctors">Doctors</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            isLoggedIn
                            ?
                            <Button variant="outline-danger" as={Link} to="/logout">
                                Log Out
                            </Button>
                            :
                            <Button variant="outline-primary" as={Link} to="/login">
                                Log In
                            </Button>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar> 
  )
}

export default NavbarC