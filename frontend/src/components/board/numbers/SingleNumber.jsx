import { useDispatch } from "react-redux";
import { handleBet } from "../../../store/bets";

export default function SingleNumber(props){
    
    const dispatch = useDispatch();

    return <button 
        className={`${props.color} px-4 py-2 border border-black transform active:scale-110 active:z-50`}
        onClick={()=>{
            dispatch(handleBet(props.value));
        }}
    >{props.value}</button>
}