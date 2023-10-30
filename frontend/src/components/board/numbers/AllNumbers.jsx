import NumberRow from "./NumberRow"
import Zero from "./Zero"

export default function AllNumbers() {
    return (
            <>
                {[1, 2, 3].map(n => <NumberRow start={n} />)}
            </>
    )
}