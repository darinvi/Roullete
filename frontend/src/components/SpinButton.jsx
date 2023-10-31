import { useDispatch, useSelector } from "react-redux"

export default function SpinButton(){

    const dispatch = useDispatch();
    const bets = useSelector(state => state.bets.betSummary)

    return (
        <button
            disabled={bets.length === 0}
            className="bg-green-300 disabled:bg-gray-100 w-fit mx-auto px-6 py-1 rounded transform hover:bg-green-500 hover:scale-105 disabled:scale-100 border-2 border-black disabled:text-gray-300"
        >BUTTON</button>
    )
}