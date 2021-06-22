import { useEffect } from 'react'
import { useState } from 'react'
import {Card, Button, Modal, Form} from 'react-bootstrap'
import "./Appointment.css"

const Appointment = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [showPatients, setShowPatients] = useState(false)
    const [doctors, setDoctors] = useState([
        {
            "id" : 1,
            "name" : "Dr. James",
            "desc" : "blabla james",
            "patients" : [
                "abraham",
                "emmanuel"
            ]
        },
        {
            "id" : 2,
            "name" : "Dr. Brown",
            "desc" : "blabla brown",
            "patients" : [
                "abraham",
                "emmanuel"
            ]
        },
        {
            "id": 3,
            "name" : "Dr. Jack",
            "desc" : "blabla jack",
            "patients" : [
                "abraham",
                "emmanuel"
            ]
        }
    ])
    const [editFields, setEditFields] = useState({})

    const handleShowEdit = (idx) => {
        setEditFields({"name" : doctors[idx].name, "desc" : doctors[idx].desc})
    }
    const handleShowPatients = () => setShowPatients(true)

    const handleCloseEdit = () => setEditFields({})    
    const handleClosePatients = () => setShowPatients(false)

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
        <Card>
            <Card.Header>List of Appointment</Card.Header>
            <Card.Body className="appointment-list-container">
                {doctors.map((doctor, index) => { 
                    return (
                        <Card style={{ width: 'auto' }} className="appointment-list" key={index}>
                            <Card.Img variant="top" src="holder.js/100px180"/>
                            <Card.Body>
                                <Card.Title>{doctor.name}</Card.Title>
                                <Card.Text>
                                    { doctor.desc }
                                </Card.Text>

                                {/* Book the doctor */}
                                <Button variant="primary">Book</Button>

                                {/* Edit doctor - Admin Only */}
                                <Button variant="primary" onClick={() => handleShowEdit(index)}>Edit</Button>
                                
                                {/* Show List of Patients - Admin Only */}
                                <Button variant="primary" onClick={() => handleShowPatients()}>Patients</Button>
                            </Card.Body>

                            {/* Edit Window */}
                            <Modal show={showEdit} onHide={() => handleCloseEdit()} backdrop="static"  keyboard={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Doctor</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group controlId="doctorNameField">
                                        <Form.Label>Doctor's Name</Form.Label>
                                        <Form.Control type="text" defaultValue={editFields.name} 
                                            onChange={e => setEditFields("name", e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="doctorDescField">
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

                            {/* List of Patients Window */}
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
                            </Modal>
                        </Card>
                )})}
            </Card.Body>
        </Card>
    )
}

export default Appointment