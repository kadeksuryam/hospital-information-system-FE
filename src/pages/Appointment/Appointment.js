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
    const [showAdd, setShowAdd] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [editFields, setEditFields] = useState({})
    const [addFields, setAddFields] = useState({})
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
            if(!appointments[index].isApplied){
                const URI = `http://192.168.1.24:5000/api/patient-appointments`
                const payload = {
                    "patientID" : localStorage.getItem("authUserID"),
                    "appointmentID" : appointmentID
                }
                await axios.post(URI, payload, {headers: headers})
            }
            else{
                const URI = `http://192.168.1.24:5000/api/patient-appointments?appointmentID=${appointmentID}`
                await axios.delete(URI, {headers: headers})
            }
            
            //AFTER APPLYING/CANCELING AN APPOINTMENT, FETCH ALL APPOINTMENT AGAIN
            const URI_GET_APPOINTMENT = `http://192.168.1.24:5000/api/appointments?doctorID=${doctorID}`
            let newAppointments = (await axios.get(URI_GET_APPOINTMENT, {headers: headers})).data
            
            for(let newAppointment of newAppointments){
                for(let appointment of appointments){
                    if(newAppointment._id === appointment._id)
                         newAppointment.isApplied = appointment.isApplied
                }
            }
            
            newAppointments[index].isApplied = !newAppointments[index].isApplied
            
            //console.log(newAppointments)
            setAppointments(newAppointments)
        } catch(err){
            if(err.response){
                //console.log(err.response)
                if(err.response.status === 401){
                    alert("Your session has expired. Please relogin!")
                    history.push('/logout')
                }
                else alert(err.response.data.error)
            }
            else alert(err.message)
        }

    } 
    useEffect(() => {
        if(Object.keys(editFields).length > 0)
            setShowEdit(true)
        else setShowEdit(false)
    }, [editFields])

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
            
           // console.log(resUserAppointments)
            for(let appointment of resAppointments){
                appointment.isApplied = false
                for(let userAppointment of resUserAppointments){
                    if(appointment._id === userAppointment.appointmentID){
                        appointment.isApplied = true
                    }
                }
            }
           // console.log(resAppointments)
            setAppointments(resAppointments)
        } catch(err){
           if(err.response){
               //console.log(err.response)
               if(err.response.status === 401){
                   alert("Your session has expired. Please relogin!")
                   history.push('/logout')
               }
               else alert(err.response.data.error)
           }
           else alert(err.message)
        }
    }

    useEffect(() => {
        //Fetch data first time from API
        if(showEdit) return;
        getAppointments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEdit, showAdd])


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
                else alert(err.response.data.error)
            }
            else alert(err.message)
        }
    }
    
    const handleAddAppointment = async () => {
        try{
            const URI_ADD_APPOINTMENT = `http://192.168.1.24:5000/api/appointments/`
            const { name, desc, mxPatients } = addFields
            const payloads = {appointmentName: name, desc: desc, 
                doctorID: doctorID, maxAppointment: mxPatients }

            //API REQUEST : POST
            const JWT_TOKEN = localStorage.getItem('JWT_token')
            const headers = {
                Authorization : 'Bearer ' + JWT_TOKEN
            }
            await axios.post(URI_ADD_APPOINTMENT , payloads, {headers: headers})
            setShowAdd(false)
        }
        catch(err){
            if(err.response){
                //console.log(err.response)
                if(err.response.status === 401){
                    alert("Your session has expired. Please relogin!")
                    history.push('/logout')
                }
                else alert(err.response.data.error)
            }
            else alert(err.message)
        }
    }

    const handleDelete = async (appointmentID) => {
        const URI_DELETE_APPOINTMENT = `http://192.168.1.24:5000/api/appointments/${appointmentID}`
        const JWT_TOKEN = localStorage.getItem('JWT_token')
        const headers = {
            Authorization : 'Bearer ' + JWT_TOKEN
        }
        await axios.delete(URI_DELETE_APPOINTMENT, {headers: headers})
        getAppointments()
    }

    const handleListPatients = (appointmentID) => {
        history.push(`/appointments/${appointmentID}/patients`)
    }

    return (
        <Card style={{margin: '1rem'}}>
            {
                (isAdmin())
                ? 
                    <Button variant="primary" style={{margin : "0.5rem auto"}}
                      onClick={() => setShowAdd(true)}  >Add an Appointment</Button>
                : <></> 
            }
            <Card.Header>Available Appointments</Card.Header>
            <Card.Body className="appointment-list-container">
                {appointments.map((appointment, index) => { 
                    return (
                        <Card style={{ width: 'auto', "maxWidth" : '15rem' }} className="appointment-list" key={index}>
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
                                                            onClick={() => handleDelete(appointment._id)}>Delete</Button>
                                                     <Button variant="primary" 
                                                            onClick={() => handleListPatients(appointment._id)}>List of Patients</Button>
                                                    </>
                                                )
                                            }
                                            else{
                                               if(!appointment.isApplied){
                                                return <Button variant="primary"
                                                     onClick={() => handleApply(appointment._id, index)} 
                                                      disabled={appointment.cntAppointment === appointment.maxAppointment}>Apply</Button>
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

                            {(isAdmin()) ?
                                <>
                                    {/* Edit Add Appointment Modal Window */}
                                    <Modal show={showAdd} onHide={() => setShowAdd(false)} backdrop="static" keyboard={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add an Appointment</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group controlId="appointmentNameField">
                                                <Form.Label>Appointment's Name</Form.Label>
                                                <Form.Control type="text" 
                                                    onChange={e => setAddFields({...addFields, "name" : e.target.value})}/>
                                            </Form.Group>
                                            <Form.Group controlId="appointmentDescField">
                                                <Form.Label>Descriptions</Form.Label>
                                                <Form.Control as="textarea"
                                                    onChange={e => setAddFields({...addFields, "desc" : e.target.value})} />
                                            </Form.Group>
                                            <Form.Group controlId="appointmentDescField">
                                                <Form.Label>Max Patients</Form.Label>
                                                <Form.Control type="number"
                                                    onChange={e => setAddFields({...addFields, "mxPatients" : parseInt(e.target.value)})} />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={() => handleAddAppointment()}>
                                                Add Appointment
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    {/* Edit Modal Window */}
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
                                </>
                                : <></> 
                            }
                        </Card>
                )})}
            </Card.Body>
        </Card>
    )
}

export default Appointment