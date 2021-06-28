import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Spinner, Toast } from 'react-bootstrap'
import validator from '../../utils/validation'
import { isLogin } from '../../utils/isLogin'
import './Signup.css'
import ErrorNotification from '../../components/ErrorNotification'

/* Field Error Finder */
const errorFinder = (form) => {
    const { firstName, age, email, password } = form
    const newErrors = {}
    /* First Name errors*/
    if(!firstName || firstName === '') newErrors.firstName = "First name can't be empty."

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

const Signup = ({setIsLoggedIn}) => {
    const [errorBackend, setErrorBackend] = useState("")
    const [toggleErrorBackend, setToggleErrorBackend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [isValidated, setIsValidated] = useState(false)
    const history = useHistory()

    /* Field State Handler*/
    const setField = (field, value) => {
        setForm({
            ...form,
            [field] : value
        })
        if(!!errors[field]) setErrors({...errors, [field]: null})
    }

    /* Validate everytime input fields change, after form has isValidated  */
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
        setIsValidated(true)
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        }
        else{
            setIsLoading(true)
        }
    }

    /* API CALL */
    const submitTheForm = async () => {
        if(isValidated){
            const { firstName, lastName, age, email, password } = form
            try{
                //Sign Up
                const signupURL = "http://192.168.1.24:5000/api/patients"
                const resSignUp = await axios.post(signupURL, {firstName, lastName, age, email, password})

                localStorage.setItem("JWT_token", resSignUp.data.token)
                localStorage.setItem("authUserID", resSignUp.data.authUserID)
                localStorage.setItem("userType", resSignUp.data.userType)

            } catch(err){
                if(err.response) setErrorBackend(err.response.data.error)
                else setErrorBackend(err.message)
            }
        }
        if(isLogin()){
            setIsValidated(false)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        //as an effect no errors, submit the form
        if(isLoading){
            const submit = async () => {
                await submitTheForm()
                if(isLogin()){
                    setIsLoggedIn(true)
                }
            }
            submit()
        }
    }, [isLoading])

    useEffect(() => {
        if(errorBackend !== "") setToggleErrorBackend(true)
        else setToggleErrorBackend(false)
    }, [errorBackend])

    const handleToggleErrorBackend = () => {
        setErrorBackend("")
    }  

    return (
        <div>
            <div className="signup-banner">
                <div className="signup-banner-title">Sign Up</div>
                <div className="signup-banner-content">Please fill your personal information to create an account.</div>
            </div>
            <div className='signup-container'>
                <Form noValidate className='signup-form'>
                    <ErrorNotification toggleError={toggleErrorBackend}
                         handleToggleError={handleToggleErrorBackend}
                         errorMsg = {errorBackend} />

                    <Form.Row>
                        {/* First Name Field */}
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First name"
                                isInvalid={!!errors.firstName} isValid={!errors.firstName && isValidated}
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
                                isInvalid={!!errors.lastName} isValid={!errors.lastName && isValidated}
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
                            isInvalid={!!errors.age} isValid={!errors.age && isValidated}
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
                    <Form.Group>
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
                            ? 'Submitting...' : 'Sign Up'}
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default Signup