import { useEffect } from 'react'
import { useState } from 'react'
import {Card, Button, Modal, Form} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import "./Appointment.css"

const Appointment = () => {
    let { id } = useParams()
    const [showEdit, setShowEdit] = useState(false)
    const [appointments, setAppointments] = useState([
        {
            "doctorID" : 1,
            "name" : "Consulting about teeth",
            "patients" : [
                "abraham",
                "emmanuel"
            ],
            "desc" : "Every saturday, 1 PM"
        }
    ].filter(item => parseInt(item.doctorID) === parseInt(id)))

    const [editFields, setEditFields] = useState({})

    const handleShowEdit = (idx) => {
        setEditFields({"name" : appointments[idx].name, "desc" : appointments[idx].desc})
    }
    const handleCloseEdit = () => setEditFields({})    

    const handleSubmitEdit = () => {
        // API calls
    }

    useEffect(() => {
        if(Object.keys(editFields).length > 0)
            setShowEdit(true)
        else setShowEdit(false)
    }, [editFields])

    useEffect(() => {
        //Fect data first time from API
    }, [])

    useEffect(() => {
        if(!showEdit){
           //Fetch data from API   
        }
    }, [showEdit])


    return (
        <Card style={{margin: '1rem'}}>
            <Card.Header>Available Appointments</Card.Header>
            <Card.Body className="appointment-list-container">
                {appointments.map((appointment, index) => { 
                    return (
                        <Card style={{ width: 'auto' }} className="appointment-list" key={index}>
                            <Card.Body>
                                <Card.Title>{appointment.name}</Card.Title>
                                <Card.Text>
                                    { appointment.desc }
                                </Card.Text>

                                {/* Book the doctor */}
                                <Button variant="primary">Book</Button>

                                {/* Edit doctor - Admin Only */}
                                <Button variant="primary" onClick={() => handleShowEdit(index)}>Edit</Button>
                        
                            </Card.Body>

                            {/* Edit Window */}
                            <Modal show={showEdit} onHide={() => handleCloseEdit()} backdrop="static"  keyboard={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Appointments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group controlId="appointmentNameField">
                                        <Form.Label>Appointment's Name</Form.Label>
                                        <Form.Control type="text" defaultValue={editFields.name} 
                                            onChange={e => setEditFields("name", e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="appointmentDescField">
                                        <Form.Label>Descriptions</Form.Label>
                                        <Form.Control as="textarea" defaultValue={editFields.desc}
                                            onChange={e => setEditFields("desc", e.target.value)} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => handleCloseEdit()}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            {/* List of Patients Window
                            <Modal show={showPatients} onHide={() => handleClosePatients()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>List of Patients</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {doctor.patients.map((patient, pIdx) => {
                                        return (
                                            <p key={pIdx}>{patient}</p>
                                        )
                                    })}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleClosePatients()}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal> */}
                        </Card>
                )})}
            </Card.Body>
        </Card>
    )
}

export default Appointment