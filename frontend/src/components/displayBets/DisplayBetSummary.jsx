import { useSelector } from "react-redux"

export default function DisplayBetSummary() {

    const summary = useSelector(state => state.bets.betSummary);

    const renderSummary = Object.entries(summary).map(([number, value]) => {
        return (
            <div
                key={number}
                className='grid grid-cols-3 gap-x-3 items-stretch border hover:bg-gray-100'
            >
                <p className="text-center">{number}</p>
                <p className="text-center">{parseFloat(value).toFixed(2)}</p>
                <p className="text-center">{parseFloat(value*36).toFixed(0)}</p>
            </div>
        )
    })

    return (
        <div className="flex flex-col gap-2 border-2 h-68 w-fit">
            <div>
                <div className="grid grid-cols-3 gap-x-3 items-stretch bg-gray-200">
                    <div>
                        <label className="block">Number</label>
                    </div>
                    <div>
                        <label className="block text-center">Bet</label>
                    </div>
                    <div>
                        <label className="block">Payout</label>
                    </div>
                </div>
            </div>
            <div className="h-64 overflow-y-auto">
                {renderSummary}
            </div>
        </div>
    )
}