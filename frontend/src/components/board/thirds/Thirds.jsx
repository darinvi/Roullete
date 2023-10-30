import SingleThird from "./SingleThird"

export default function Thirds(){
    
    return (
        <div className="w-full flex">
            {
                [1,2,3].map( third => {
                    return <SingleThird third={third} />
                })
            }
        </div>
    )
}