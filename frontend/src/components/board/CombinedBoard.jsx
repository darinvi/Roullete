import AllNumbers from "./numbers/AllNumbers"
import Thirds from "./thirds/Thirds"
import Zero from "./numbers/Zero"
import BinaryBets from "./binaries/BinaryBets"

export default function CombinedBoard(){
    return (
        <div className="w-fit flex">
            <Zero />
            <div className="flex flex-col">
                <AllNumbers />
                <Thirds />
                <BinaryBets />
            </div>
        </div>
    )
}