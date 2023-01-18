import { useState } from "react";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const nav = useNavigate();

  return (
    <div>
      <h1>PLEASE REGISTER OR LOGIN</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await registerUser(username, password);
          console.log("register", result);
          if (result) {
            setUsername("");
            setPassword("");
            nav("/users/login");
          } else {
            console.log("worked");
            setError(result.message);
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

        <button>Submit</button>
      </form>
      {error && <alert>{error}</alert>}
      <div>
        <h5>
          Already have an account?{" "}
          <a
            onClick={() => {
              nav("users/login");
            }}
          >
            Sign In
          </a>
        </h5>
      </div>
    </div>
  );
}
