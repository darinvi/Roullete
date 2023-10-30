import Colors from "./Colors"
import EvenOdd from "./EvenOdd"
import Halves from "./Halves"

export default function BinaryBets(){
    return(
        <div className="flex">
            <Halves half={1} />
            <EvenOdd type={"Even"} />
            <Colors />
            <EvenOdd type={"Odd"} />
            <Halves half={2} />
        </div>
    )
}