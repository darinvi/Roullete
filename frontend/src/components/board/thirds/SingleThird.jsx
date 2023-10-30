export default function SingleThird(props){
    
    const ordinals = {
        1: 'st',
        2: 'nd',
        3: 'rd'
    }
    return (
        <button
            className="bg-cyan-100 hover:bg-cyan-200 border border-black transform active:scale-110 w-1/3"
        >{props.third}{ordinals[props.third]}12</button>
    )
}