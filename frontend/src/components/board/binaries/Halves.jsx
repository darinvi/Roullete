export default function Halves(props){
    // again only differs in the type of reducer it will trigger
    const start = props.half === 1 ? 1 : 19
    const end = props.half === 1 ? 18 : 36
    return (
        <button
            className="bg-cyan-100 hover:bg-cyan-200 w-1/6 transform active:scale-110 border border-black"
        >{start} to {end}</button>
    ) 
}