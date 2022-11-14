import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CreateRoutine(){
    const [is_public, setIs_public] = useState("");
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    const navigate = useNavigate();
  
    return(
        <form>
                <input 
                    value={name}
                    onChange={(event)=>{
                        setName(event.target.value);
                    }}
                    type="text"
                    placeholder="Date Of Routine"
                />

                <input 
                    value={goal}
                    onChange={(event)=>{
                        setGoal(event.target.value);
                    }}
                    type="text"
                    placeholder="Goal for the Routine Day"
                />

            <label>
                <input 
                    value={is_public}
                    onChange={(event)=>{
                        setIs_public(event.taget.value);
                    }}
                    type="checkbox"
                />
            </label>
                <button
                onClick={()=>{
                    navigate('/')
                }}> Submit Routine</button>

        </form>
    )
}

export default CreateRoutine;