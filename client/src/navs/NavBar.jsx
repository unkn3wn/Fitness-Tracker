import { Link } from "react-router-dom";
import TheLogout from "../components/LogOut"

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/routes/activites">Activties </Link>
      <Link to="/routes/routines">Routines</Link>
      {/* switch logout to the button so immport button function */}
      <TheLogout/>
    </nav>
  );
}

export default NavBar;
