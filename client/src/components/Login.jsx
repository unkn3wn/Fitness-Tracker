import { useState } from "react";
import { loginUser } from "../api/users";
import { useNavigate } from "react-router-dom";

function TheLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const nav = useNavigate();
  return (
    <div>
      <h1>LOGIN IN</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await loginUser(username, password);
          console.log(result);
          if (result) {
            setUsername("");
            setPassword("");
            
          } else {
            console.log("hello");
            setError(result.message);
          }
        }}
      >
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter a Username"
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter Your Password"
        />
        {error && <h4>{error}</h4>}
        <button
          onClick={() => {
            console.log({ username });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TheLogin;
