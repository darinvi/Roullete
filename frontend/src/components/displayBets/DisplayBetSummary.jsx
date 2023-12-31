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
                <p className="text-center">{value}</p>
                <p className="text-center">{value*36}</p>
            </div>
        )
    })

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2 border-4 border-gray-200 h-fit w-fit bg-white">
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
            <p className="text-xs">*Payouts show how much is to be won if that specific number is hit.*</p>
        </div>
        
    )
}