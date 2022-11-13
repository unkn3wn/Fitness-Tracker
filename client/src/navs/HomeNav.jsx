import {Link} from "react-router-dom";

function HomeNavBar(){
    return(
        <nav>
            <Link to="/routes/users/register">Register</Link>
            <Link to="/routes/users/login">Login</Link>
        </nav>

    )
}
export default HomeNavBar;