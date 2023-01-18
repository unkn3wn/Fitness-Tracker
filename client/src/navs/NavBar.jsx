import { Link } from "react-router-dom";
import TheLogout from "../components/LogOut"

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/activities">Activties </Link>
      <Link to="/routines">Routines</Link>
      {/* switch logout to the button so import button function */}
      <TheLogout/>
    </nav>
  );
}

export default NavBar;
