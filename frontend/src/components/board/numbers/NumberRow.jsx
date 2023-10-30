import { useEffect, useState } from "react"
import SingleNumber from "./SingleNumber"

export default function NumberRow(props) {

    const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
    const RED_NUMBERS =   [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

    const [currentRowNumbers, setCurrentRowNumbers] = useState([]);

    useEffect(() => {
        let numbers = [];
        for (let i = props.start; i <= 36; i += 3) {
            numbers.push(i);
        }
        setCurrentRowNumbers(numbers);
    }, []);

    const renderNumberButtons = currentRowNumbers && currentRowNumbers.map( number => {
        return <SingleNumber 
            value={number} 
            color={RED_NUMBERS.includes(number) ? "bg-red-300 hover:bg-red-200" : "bg-gray-600 hover:bg-gray-400 text-white"} 
        />
    })

    return (
        <div>
            { renderNumberButtons }
        </div>
    )
}