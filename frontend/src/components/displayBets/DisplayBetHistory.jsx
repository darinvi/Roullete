import { useDispatch, useSelector } from "react-redux";
import { removeSingleBet } from "../../store/bets";

export default function DisplayBetHistory() {

    const betHistory = useSelector(state => state.bets.betHistory);
    const dispatch = useDispatch();

    const renderBetHistory = betHistory.map(e => {
        return (
            <li
                className="flex gap-2 border px-2 hover:bg-gray-100"
                key={e.id}
            >
                <p>Bet: <span className="font-medium">{e.number}</span></p>
                <p>Amount: <span className="font-medium">{e.amount}</span></p>
                <button 
                    className="ml-2 bg-red-200 rounded hover:bg-red-300 px-2"
                    onClick={()=>dispatch(removeSingleBet(e.id))}
                >Clear Bet</button>
            </li>
        )
    })

    return (
        <div className="flex flex-col gap-2 border-2 h-68">
            <p className="w-full text-center bg-gray-100">Bets:</p>
            <ul className="h-60 overflow-y-auto">
                {renderBetHistory}
            </ul>
        </div>
    )
}