import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import validator from '../../utils/validation'
import './Signup.css'

const Signup = () => {
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    /* Field Error Finder */
    const errorFinder = () => {
        const {firstName, age, email, password } = form
        const newErrors = {}
        
        /* First Name errors*/
        if(!firstName || firstName === '') newErrors.firstName = "First name can't be empty"

        /* Age errors */
        if(!age || age === '') newErrors.age = "Age can't be empty"
        else if(age <= 0) newErrors.age = "Please provide valid age" 

        /* Email field errors*/
        if(!email || email === '') newErrors.email = "Please provide an email."
        else if(!validator.email.regex.test(email)) {
            newErrors.email = validator.email.errMsg
        }

        /* Password fields errors */
        if(!password || password === '') newErrors.password = "Please provide a password."
        else if(!validator.password.regex.test(password)){
            newErrors.password = validator.password.errMsg
        }

        return newErrors
    }
 
    /* Validate everytime input fields change, after form has validated  */
    useEffect(() => {
        if(validated){
            const newErrors = errorFinder(form)
            if(Object.keys(newErrors).length > 0){
                setErrors(newErrors)
            }
        }
    }, [form, validated])

    /* Field State Handler*/
    const setField = (field, value) => {
        setForm({
            ...form,
            [field] : value
        })

        if(!!errors[field]) setErrors({...errors, [field]: null})
    }

    /* Submit Handler, Calls APIs */
    const handleSubmit = (event) => {
        event.preventDefault()
        setValidated(true)
    }   

    return (
        <div>
        <div className='signup-container'>
            <Form noValidate onSubmit={handleSubmit} className='signup-form'>
                <Form.Row>
                    {/* First Name Field */}
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First name"
                            isInvalid={!!errors.firstName} isValid={!errors.firstName && validated}
                            onChange={e => setField("firstName", e.target.value)}  />
                        <Form.Control.Feedback type="invalid">
                               {errors.firstName}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                               Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Last Name Field */}
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last name"
                            isInvalid={!!errors.lastName} isValid={!errors.lastName && validated}
                            onChange={e => setField("lastName", e.target.value)}  />
                        <Form.Control.Feedback type="invalid">
                               {errors.lastName}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                               Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                {/* Age Field */}
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Age"
                        isInvalid={!!errors.age} isValid={!errors.age && validated}
                        onChange={e => setField("age", e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                            {errors.age}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                            Looks good!
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email"
                        isInvalid={!!errors.email} isValid={!errors.email && validated}
                        onChange={e => setField("email", e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                               {errors.email}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                               Looks good!
                        </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        isInvalid={!!errors.password} isValid={!errors.password && validated}
                        onChange={e => setField("password", e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                            {errors.password}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                            Looks good!
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="outline-primary" type="submit">
                        Sign Up
                </Button>
            </Form>
        </div>
        </div>
    )
}
export default Signup