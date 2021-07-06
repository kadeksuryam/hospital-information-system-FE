import {Jumbotron, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
        <Jumbotron className="home-container">
            <div className="home-banner-title">Welcome to Our Hospital Information System</div>
            <div className="home-banner-content">
                We provide a service that is you can apply an appointment with our doctors.
                You need an account to apply an appointment, if you dont have yet, you can create <Link to="/signup">here</Link>
            </div>
            <div className="home-banner-appointment">
                <Button as={Link} to="/doctors" variant="primary">List of Doctors</Button>
            </div>
        </Jumbotron>
    )
}

export default Home