import { useDispatch } from "react-redux"
import { handleBet } from "../../../store/bets"

export default function Zero(){

    const dispatch = useDispatch();

    return (
        <button 
            className="bg-green-300 hover:bg-green-200 px-2 border border-black transform active:scale-110 active:z-50"
            onClick={()=>dispatch(handleBet(0))}
        >0</button>
    )
}