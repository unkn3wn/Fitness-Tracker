import {Link} from "react-router-dom";

function NavBar(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/routes/activites">Activties </Link>
            <Link to="/routes/routines">Routines</Link>
            <Link>logout</Link>
        </nav>
    )
}  

export default NavBar;