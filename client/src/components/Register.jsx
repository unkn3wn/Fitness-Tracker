import { useState } from "react";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  return (
    <div>
      <h1>REGISTER</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await registerUser(username, password);
          console.log("register", result);
          if (result) {
            setUsername("");
            setPassword("");

            console.log("you are ", result);
          } else {
            console.log("Error in registering the user");
          }
        }}
      >
        {/* 2 inputs and submit. one for username and password */}
        {/* value = username/ password*/}
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter a UserName"
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="enter your password"
        />

        <button
          onClick={() => {
           
            nav("/routes/users/login");
          
          }}
        >Submit</button>
      </form>
    </div>
  );
}
