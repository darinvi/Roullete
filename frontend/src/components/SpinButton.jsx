import { useDispatch, useSelector } from "react-redux"
import { useWallets } from "@web3-onboard/react"
import { ethers } from 'ethers'
import { ROULETTER_ABI, ROULETTE_ADDRESS } from "../constants";
import { setLoading } from "../store/contracts";

export default function SpinButton() {

    const dispatch = useDispatch();
    const bets = useSelector(state => state.bets.betSummary);
    const preparedData = useSelector(state => state.bets.preparedData);
    const total = useSelector(state => state.bets.betTotal);
    const connectedWallets = useWallets();

    function handleSpinButton() {
        const injectedProvider = connectedWallets[0].provider;
        const provider = new ethers.providers.Web3Provider(injectedProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ROULETTE_ADDRESS, ROULETTER_ABI, signer);

        // const listener = contract.on("rouletteSpun", (player, payout, numberRolled) => {
        //     console.log(player, payout, numberRolled)
        // })

        contract.spin(preparedData.numbers, preparedData.payouts, { value: total })
            .then(tx => {
                dispatch(setLoading(true))
                return tx.wait()}
            )
            .then(res => {
                console.log('???')
                console.log(res)
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err.message)
                dispatch(setLoading(false))
            })

        // listener.off();
    }


    return (
        <div className="flex justify-between">
            {total > 0 && (
                <div className="flex flex-col">
                    <p className="text-2xl">Total Wei Bet: <span className="font-medium">{total}</span> After Rounding</p>
                    <div>
                        <p className="text-xs">*total might seem a bit off due to rounding when spreading the non-numeric bets*</p>
                        <p className="text-xs">*rounding has to be done due to the way solidity works*</p>
                        <p className="text-xs">*it only differs from what the bets show, all is fair after they are spread*</p>
                    </div>
                </div>
            )}
            <button
                disabled={bets.length === 0}
                className="bg-green-300 disabled:bg-gray-100 w-fit px-6 py-1 h-fit rounded transform hover:bg-green-500 hover:scale-105 disabled:scale-100 border-2 border-black disabled:text-gray-300"
                onClick={handleSpinButton}
            >Spin Roulette</button>
        </div>
    )
}