import { useDispatch } from "react-redux"
import { handleBet } from "../../../store/bets"

export default function Halves(props){
    
    const reducerData = props.half === 1 ? "1 to 18" : "19 to 36";
    const start = props.half === 1 ? 1 : 19;
    const end = props.half === 1 ? 18 : 36;

    const dispatch = useDispatch();

    return (
        <button
            className="bg-cyan-100 hover:bg-cyan-200 w-1/6 transform active:scale-110 border border-black active:z-50"
            onClick={()=>dispatch(handleBet(reducerData))}
        >{start} to {end}</button>
    ) 
}