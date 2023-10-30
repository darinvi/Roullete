import AllNumbers from "./numbers/AllNumbers"
import Thirds from "./thirds/Thirds"
import Zero from "./numbers/Zero"
import BinaryBets from "./binaries/BinaryBets"
import Chips from "./chips/Chips"

export default function CombinedBoard(){
    return (
        <div className="flex flex-col gap-4 w-fit">
            <div className="w-fit flex select-none">
                <Zero />
                <div className="flex flex-col">
                    <AllNumbers />
                    <Thirds />
                    <BinaryBets />
                </div>
            </div>
            <Chips />
        </div>
    )
}