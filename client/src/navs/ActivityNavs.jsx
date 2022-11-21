import {Link} from "react-router-dom";

function ActivityNavBar(){
    return(
        <nav>
            <Link to="/activities/create">Create a Activity</Link>
        </nav>
    )
}

export default ActivityNavBar;