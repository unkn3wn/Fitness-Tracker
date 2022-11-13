import {UseUser} from "../hooks/UseUser"
import {useState} from "react";
import loginUser from "../api/users"

function TheLogin(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [loggedIn, setLoggedIn] = UseUser();

    return(
        <div>
            <h1>LOGIN IN</h1>
                <form
                onSubmit={async(event)=>{
                    event.preventDefault();
                    const result = await loginUser(username,password);
                    console.log(result);

                    if(result.user){
                        setPassword("");
                        setUsername("");
                        console.log("you are now logged in", loggedIn);
                    }else{
                        console.log("Failed to login")
                    }
                }}>
                    <input
                        value={username}
                        onChange={(event)=>setUsername(
                            event.target.value
                        )}
                        placeholder="Enter a Username"
                    />

                    <input
                        value={password}
                        onChange={(event)=>setPassword(
                            event.target.value
                        )}
                        placeholder="Enter Your Password"
                    />

                    <button>Submit</button>
                    
                </form>
        </div>
    )
}

export default TheLogin;