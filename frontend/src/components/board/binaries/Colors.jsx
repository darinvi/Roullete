import { useDispatch } from "react-redux"
import { handleBet } from "../../../store/bets";

export default function Colors(){

    const dispatch = useDispatch();

    return <>
        <button
            className="bg-red-400 hover:bg-red-300 w-1/6 transform active:scale-110 border border-black active:z-50"
            onClick={()=>dispatch(handleBet('Red'))}
            >Red</button>

        <button
            className="bg-gray-800 hover:bg-gray-600 text-white w-1/6 transform active:scale-110 border border-black active:z-50"
            onClick={()=>dispatch(handleBet('Black'))}
        >Black</button>
    </>
}