import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import validator from '../../utils/validation'
import './Login.css'

const Login = () => {
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    /* Field Error Finder */
    const errorFinder = () => {
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

    return(
        <div>
            <div className="login-banner">
                <div className="login-banner-title">Login</div>
                <div className="login-banner-content">Before proceeding, please enter your email and password</div>
            </div>

            <div className="login-form-container">
                <Form noValidate onSubmit={handleSubmit} className="login-form">

                    {/* Email Field */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
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
                    <Form.Group controlId="formBasicPassword">
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

                    {/* Submit Button */}
                    <Button variant="outline-primary" type="submit">
                        Sign In
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