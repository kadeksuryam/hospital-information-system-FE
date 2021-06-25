import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button, Toast, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import validator from '../../utils/validation'
import './Login.css'

let isValidated = false

/* Field Error Finder */
const errorFinder = (form) => {
    const { email, password } = form
    const newErrors = {}

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

const Login = () => {
    const [errorBackend, setErrorBackend] = useState("")
    const [toggleErrorBackend, setToggleErrorBackend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    /* Field State Handler*/
    const setField = (field, value) => {
        setForm({
            ...form,
            [field] : value
        })
        if(!!errors[field]) setErrors({...errors, [field]: null})
    }

    /* Validate everytime input fields change, after form has validated  */
    useEffect(() => {
        if(isValidated){
            const newErrors = errorFinder(form)
            if(Object.keys(newErrors).length > 0){
                setErrors(newErrors)
            }
        }
    }, [form])
    
    /* Submit Button Handler */
    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = errorFinder(form)
        isValidated = true
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        }
        else{
            setIsLoading(true)
        }
    }

    /* API CALL */
    const submitTheForm = async () => {
        setTimeout(() => {}, 3000);
        if(isValidated){
            const URL = "http://192.168.1.24:5000/api/login"
            try{
                const resSignIn = await axios.post(URL, {email: form.email, password: form.password })
                console.log(resSignIn)
            } catch(err){
                setErrorBackend(err.response.data.error)
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        //as an effect no errors, submit the form
        if(isLoading){
            submitTheForm()
        }
    }, [isLoading])

    useEffect(() => {
        if(errorBackend !== "") setToggleErrorBackend(true)
        else setToggleErrorBackend(false)
    }, [errorBackend])

    const handleToggleErrorBackend = () => {
        setErrorBackend("")
    }

    console.log(errorBackend)
    return(
        <div>
            <div className="login-banner">
                <div className="login-banner-title">Sign In</div>
                <div className="login-banner-content">Before proceeding, please enter your email and password</div>
            </div>

            <div className="login-form-container">
                <Form noValidate className="login-form">
                    <Toast show={toggleErrorBackend} onClose={handleToggleErrorBackend}>
                        <Toast.Header>
                        <strong className="mr-auto" style={{color: 'red'}}>Error</strong>
                        </Toast.Header>
                        <Toast.Body>{errorBackend}</Toast.Body>
                    </Toast>
                    {/* Email Field */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                            isInvalid={!!errors.email} isValid={!errors.email && isValidated}
                            onChange={e => setField("email", e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                               {errors.email}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                               Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            isInvalid={!!errors.password} isValid={!errors.password && isValidated}
                            onChange={e => setField("password", e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                               {errors.password}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                               Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="outline-primary" 
                        disabled={isLoading}
                        onClick={!isLoading ? handleSubmit : null}
                        type="submit">
                        {isLoading ?
                            (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : <></>
                        }
                        {isLoading 
                            ? 'Submitting...' : 'Sign In'}
                    </Button>

                    {/* Sign Up Link */}
                    <Form.Text as={Link} to='/signup'>
                        Not have an account yet? Sign Up
                    </Form.Text>
                </Form>
            </div>
        </div>
    )
}

export default Login