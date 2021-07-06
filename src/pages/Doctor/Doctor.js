import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import {Card, Button, Modal, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Doctor.css"

const Doctor = ({checkIsLoggedIn}) => {
    const [showEdit, setShowEdit] = useState(false)
    /*
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
    ]) */

    const [doctors, setDoctors] = useState([])
    useEffect(() => {
        const getDoctors = async () => {
            try{
                const res = await axios.get('http://192.168.1.24:5000/api/doctors')
                setDoctors(res.data)       
            }
            catch(err){
                if(err.response) console.log(err.response.data.error)
                else console.log(err.message)
            } 
        }        
        getDoctors()
    },[])
    
    const [editFields, setEditFields] = useState({})


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
            <Card.Header>Available Doctors</Card.Header>
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
                                <Button variant="primary" as={Link} to={`/doctors/${doctor._id}/appointments`}>
                                    {'>'}{'>'} Available Appointment</Button>
                            </Card.Body>
                        </Card>
                )})}
            </Card.Body>
        </Card>
    )
}

export default Doctor