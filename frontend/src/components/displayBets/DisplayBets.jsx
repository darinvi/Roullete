import DisplayBetHistory from "./DisplayBetHistory"
import DisplayBetSummary from "./DisplayBetSummary"

export default function DisplayBets(){
    return (
        <div className="flex gap-4">
            <DisplayBetHistory />
            <DisplayBetSummary />
        </div>
    )
}