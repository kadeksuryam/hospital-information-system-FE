import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'

const ListPatients  = () => {
    const [patients, setPatients] = useState([])
    const { appointmentID } = useParams()
    
    const history = useHistory()

    useEffect(() => {
        const getPatients = async () => {
            try{
                const GET_URI = `http://192.168.1.24:5000/api/appointments/${appointmentID}/patients`
                const JWT_TOKEN = localStorage.getItem('JWT_token')
                const headers = {
                    Authorization : 'Bearer ' + JWT_TOKEN
                }
                const resPatients = (await axios.get(GET_URI, {headers})).data    
                
                setPatients(resPatients)
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

        getPatients() 
    },[])

   
    return (
        <div style={{"margin": '1rem'}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.age}</td>
                                <td>{patient.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ListPatients