import { useDispatch } from "react-redux"
import { setCurrentChip } from "../../../store/bets";

export default function SingleChip(props){

    const dispatch = useDispatch();

    return (
        <button
            className={`${props.current === props.value ? "bg-green-400" : "bg-gray-300" } rounded-full h-fit p-4 transform hover:scale-105 hover:bg-green-300 border border-black active:scale-110`}
            onClick={()=>{
                dispatch(setCurrentChip(props.value));
            }}
        >{props.value}</button>
    )
        
}