import DisplayBetHistory from "./DisplayBetHistory"
import DisplayBetSummary from "./DisplayBetSummary"
import { useSelector } from "react-redux"

export default function DisplayBets() {

    const loading = useSelector(state => state.contracts.loading);
    const roll = useSelector(state => state.contracts.roll);
    const total = useSelector(state => state.contracts.lastTotal);

    const renderRoll = roll && (
        <div className="flex flex-col border-4 border-gray-500 mt-10 w-fit">
            <p className="w-full bg-gray-300 text-center">Last Roll:</p>
            <p className="border-b-4 border-gray-500 text-center w-full text-2xl bg-black text-white">Number: {roll.number}</p>
            <div className="flex">
                <p className="border-r-2 border-gray-500 px-2 bg-black text-white">Amount Bet: {total}</p>
                <p className="border-r-2 border-gray-500 px-2 bg-black text-white">Amount Won: {roll.amount}</p>
                <p
                    className={total < roll.amount ? "text-green-300 px-2 bg-black text-white" : ( total == roll.amount ? "text-gray-300 px-2 bg-black text-white" : "text-red-300 px-2 bg-black text-white")}
                >{total < roll.amount ? "Won" : ( total == roll.amount ? "Break Even" : "Lost")} {roll.amount - total}</p>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col">
            <div className="flex gap-4">
                <DisplayBetHistory />
                <DisplayBetSummary />
            </div>
            {loading && <p className="animate-ping text-5xl mx-auto mt-8">Loading...</p>}
            {(!loading && roll) && renderRoll}
        </div>
    )
}