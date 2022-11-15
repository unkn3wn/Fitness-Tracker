import {Link} from "react-router-dom";

function HomeNavBar(){
    return(
        <nav>
            <Link to="/users/register">Register</Link>
            <Link to="/users/login">Login</Link>
        </nav>

    )
}
export default HomeNavBar;