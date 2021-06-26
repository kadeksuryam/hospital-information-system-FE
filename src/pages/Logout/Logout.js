import { useEffect } from 'react'
import { useHistory }  from 'react-router-dom'

const Logout = ({setIsLoggedIn}) => {
    const history = useHistory()

    useEffect(() => {
        localStorage.clear()
        history.push('/')
        setIsLoggedIn(false)
    },[])

    return(
        <></>
    )
}

export default Logout