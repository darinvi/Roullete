export default function Colors(){
    // Both will have the same reducer, payload will differ
    return <>
        <button
            className="bg-red-400 hover:bg-red-300 w-1/6 transform active:scale-110 border border-black"
            >Red</button>

        <button
            className="bg-gray-800 hover:bg-gray-600 text-white w-1/6 transform active:scale-110 border border-black"
        >Black</button>
    </>
}