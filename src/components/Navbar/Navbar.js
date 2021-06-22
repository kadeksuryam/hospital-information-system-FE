import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NavbarC = () => (
    <Navbar sticky="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand as={Link} to='/'>Hospital Service</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/appointment">Appointment</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="outline-primary" as={Link} to="/login">
                        Login
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
  </Navbar>
)

export default NavbarC