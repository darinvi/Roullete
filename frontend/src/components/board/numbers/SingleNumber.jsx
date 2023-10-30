import { useState } from "react";

export default function SingleNumber(props){
    
    // on click will be handled

    return <button className={`${props.color} px-4 py-2 border border-black transform active:scale-110`}>{props.value}</button>
}