import DisplayBetHistory from "./DisplayBetHistory"
import DisplayBetSummary from "./DisplayBetSummary"
import { useSelector } from "react-redux"

export default function DisplayBets() {

    const loading = useSelector(state => state.contracts.loading)

    return (
        <div className="flex flex-col">
            <div className="flex gap-4">
                <DisplayBetHistory />
                <DisplayBetSummary />
            </div>
            {loading && (
                <div className="flex">
                    <p className="animate-ping text-5xl mx-auto">Loading...</p>
                </div>
            )}
        </div>
    )
}