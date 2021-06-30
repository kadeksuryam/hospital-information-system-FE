import { useEffect } from 'react'
import { useState } from 'react'
import {Card, Button, Modal, Form} from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import "./Appointment.css"
import axios from 'axios'

const Appointment = () => {
    const history  = useHistory()
    let { doctorID } = useParams()
    const [showEdit, setShowEdit] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [editFields, setEditFields] = useState({})
    //const [showSaveChanges, setShowSaveChanges] = useState(false)

    const handleShowEdit = (idx) => {
        setEditFields({"name" : appointments[idx].appointmentName, "desc" : appointments[idx].desc,
            "mxPatients" : appointments[idx].maxAppointment})
    }
    const handleCloseEdit = () => setEditFields({})    


    const handleApply = async (appointmentID, index) => {
        const JWT_TOKEN = localStorage.getItem('JWT_token')
        const headers = {
            Authorization : 'Bearer ' + JWT_TOKEN
        }
        try{
            let newAppointments = [...appointments]
            if(!appointments[index].isApplied){
                const URI = `http://192.168.1.24:5000/api/patient-appointments`
                const payload = {
                    "patientID" : localStorage.getItem("authUserID"),
                    "appointmentID" : appointmentID
                }
                await axios.post(URI, payload, {headers: headers})
                newAppointments[index].isApplied = true
            }
            else{
                const URI = `http://192.168.1.24:5000/api/patient-appointments?appointmentID=${appointmentID}`
                await axios.delete(URI, {headers: headers})
                newAppointments[index].isApplied = false
            }

            setAppointments(newAppointments)
        } catch(err){
            if(err.response) alert(err.response.data.error)
            else alert(err.message)
        }

    }
    useEffect(() => {
        if(Object.keys(editFields).length > 0)
            setShowEdit(true)
        else setShowEdit(false)
    }, [editFields])

    useEffect(() => {
        //Fetch data first time from API
        if(showEdit) return;
        const getAppointments = async () => {
            try{
                const URI_Appointments = `http://192.168.1.24:5000/api/appointments?doctorID=${doctorID}`
                const currUserID = localStorage.getItem("authUserID")
                const URI_User_Appointments = 
                    `http://192.168.1.24:5000/api/patient-appointments?patientID=${currUserID}`

                const JWT_TOKEN = localStorage.getItem('JWT_token')
                const headers = {
                    Authorization : 'Bearer ' + JWT_TOKEN
                }
                const resAppointments = (await axios.get(URI_Appointments, {headers: headers})).data
                const resUserAppointments = (await axios.get(URI_User_Appointments, {headers: headers})).data
                

                for(const appointment of resAppointments){
                    for(const userAppointment of resUserAppointments){
                        if(appointment._id === userAppointment.appointmentID){
                            appointment.isApplied = true
                        }
                    }
                }
                setAppointments(resAppointments)
            } catch(err){
               if(err.response){
                   //console.log(err.response)
                   if(err.response.status === 401){
                       alert("Your session has expired. Please relogin!")
                       history.push('/logout')
                   }
               }
               else alert(err.message)
            }
        }
        getAppointments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEdit])


    const isAdmin = () => (localStorage.getItem("userType") === "admin")

    const handleSaveChanges = async (appointmentID) => {
        try{
            const URI_Edit_Appointment = `http://192.168.1.24:5000/api/appointments/${appointmentID}`
            const { name, desc, mxPatients } = editFields
            const payloads = {appointmentName: name, desc: desc, maxAppointment: mxPatients }   

            //API REQUEST : PUT
            const JWT_TOKEN = localStorage.getItem('JWT_token')
            const headers = {
                Authorization : 'Bearer ' + JWT_TOKEN
            }
            await axios.put(URI_Edit_Appointment , payloads, {headers: headers})
        }
        catch(err){
            if(err.response){
                //console.log(err.response)
                if(err.response.status === 401){
                    alert("Your session has expired. Please relogin!")
                    history.push('/logout')
                }
            }
            else alert(err.message)
        }
    }

    return (
        <Card style={{margin: '1rem'}}>
            <Card.Header>Available Appointments</Card.Header>
            <Card.Body className="appointment-list-container">
                {appointments.map((appointment, index) => { 
                    return (
                        <Card style={{ width: 'auto' }} className="appointment-list" key={index}>
                            <Card.Body>
                                <Card.Title>{appointment.appointmentName}</Card.Title>
                                <Card.Text>
                                    About : { appointment.desc }
                                </Card.Text>
                                <Card.Text>
                                    Quota: { appointment.cntAppointment } / {appointment.maxAppointment}
                                </Card.Text>
                                {
                                    (
                                        () => {
                                            if(isAdmin()){
                                                return(
                                                    <>
                                                     <Button variant="primary" 
                                                            onClick={() => handleShowEdit(index)}>Edit</Button>
                                                     <Button variant="primary" 
                                                            onClick={() => handleShowEdit(index)}>List of Patients</Button>
                                                    </>
                                                )
                                            }
                                            else{
                                               if(!appointment.isApplied){
                                                return <Button variant="primary"
                                                     onClick={() => handleApply(appointment._id, index)}>Apply</Button>
                                               }
                                               else{
                                                   return <Button variant="primary" 
                                                   onClick={() => handleApply(appointment._id, index)}>Cancel</Button>
                                               }
                                            }
                                        }
                                    )()
                                }
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
                                            onChange={e => setEditFields({...editFields, "name" : e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group controlId="appointmentDescField">
                                        <Form.Label>Descriptions</Form.Label>
                                        <Form.Control as="textarea" defaultValue={editFields.desc}
                                            onChange={e => setEditFields({...editFields, "desc" : e.target.value})} />
                                    </Form.Group>
                                    <Form.Group controlId="appointmentDescField">
                                        <Form.Label>Max Patients</Form.Label>
                                        <Form.Control type="number" defaultValue={editFields.mxPatients}
                                            onChange={e => setEditFields({...editFields, "mxPatients" : parseInt(e.target.value)})} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => handleSaveChanges(appointment._id)}>
                                        Save Changes
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