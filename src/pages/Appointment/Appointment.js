import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import "./Appointment.css"

const Appointment = () => {
    return (
        <Card>
            <Card.Header>List of Appointment</Card.Header>
            <Card.Body className="appointment-list-container">
                <Card style={{ width: '18rem' }} className="appointment-list">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Dr. James</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Book</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="appointment-list">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Dr. James</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Book</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="appointment-list">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Dr. James</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Book</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="appointment-list">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Dr. James</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Book</Button>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    )
}

export default Appointment