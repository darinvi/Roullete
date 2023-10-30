import { useDispatch } from "react-redux"
import { handleBet } from "../../../store/bets";

export default function EvenOdd(props){

    const dispatch = useDispatch();

    return (
        <button
            className="bg-cyan-100 hover:bg-cyan-200 w-1/6 transform active:scale-110 border border-black active:z-50"
            onClick={()=>dispatch(handleBet(props.type))}
        >{props.type}</button>
    )
}