import {useContext} from "react";
import UserContext from "../context/UserContext";

export  const UseUser = () =>{
    const {users, setUsers,loggedIn,setLoggedIn} = useContext(UserContext);

    return{users, setUsers, loggedIn, setLoggedIn};
};