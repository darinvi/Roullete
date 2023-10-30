import SingleChip from "./SingleChip"
import { useSelector } from "react-redux"

export default function Chips(){

    const currentChip = useSelector(state => state.bets.currentChip)

    return (
        <>
            <p className="mx-auto text-lg font-medium">Chip In Wei (Current: {currentChip}):</p>
            <div className="flex justify-around">
                {[1000, 2000, 5000, 10000, 50000].map( wei => {
                    return <SingleChip value={wei} current={currentChip} />
                })}
            </div>
        </>
    )
}