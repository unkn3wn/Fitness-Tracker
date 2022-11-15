import {Link} from "react-router-dom";

function RoutineNavBar(){
    return(
        <nav>
            <Link to="/route/routines/create">Create A Routine</Link>
        </nav>
    )
}
export default RoutineNavBar;