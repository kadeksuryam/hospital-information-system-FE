import { Form, Button, Col } from 'react-bootstrap'
import './Signup.css'

const Signup = () => (
    <div>
      <div className='signup-container'>
          <Form className='signup-form'>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" placeholder="Age"/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email"/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
              
              <Button variant="outline-primary" type="submit">
                    Sign Up
              </Button>
          </Form>
      </div>
    </div>
)

export default Signup