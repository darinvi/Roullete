export default function EvenOdd(props){
    // on click send props.type
    return (
        <button
            className="bg-cyan-100 hover:bg-cyan-200 w-1/6 transform active:scale-110 border border-black"
        >{props.type}</button>
    )
}