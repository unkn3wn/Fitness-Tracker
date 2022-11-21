import { logoutUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function TheLogout({username, password}) {
  const nav = useNavigate();

  return (
    <button
      onClick={() => {
        logoutUser();
        nav("/users/login");
        
      }}
    >
      Log Out
    </button>
  );
}
