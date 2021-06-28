import { Toast } from 'react-bootstrap'

const ErrorNotification = ({toggleError, handleToggleError, errorMsg }) => {
    return (
        <Toast show={toggleError} style={{margin: '0 auto'}} onClose={handleToggleError}
             delay={4000} autohide>
            <Toast.Header>
                <strong className="mr-auto" style={{color: 'red'}}>Error</strong>
            </Toast.Header>
            <Toast.Body>{errorMsg}</Toast.Body>
        </Toast>
    )
}

export default ErrorNotification