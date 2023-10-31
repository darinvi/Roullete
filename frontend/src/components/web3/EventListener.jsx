import { ROULETTE_ABI, ROULETTE_ADDRESS } from "../../constants"
import { useWallets } from "@web3-onboard/react"
import { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { handleRollEvent } from "../../store/contracts";

export default function EventListener() {

    const connectedWallets = useWallets();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (connectedWallets.length > 0) {
            listen();
        }
    },[connectedWallets])

    function listen() {
        const injectedProvider = connectedWallets[0].provider;
        const provider = new ethers.providers.Web3Provider(injectedProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ROULETTE_ADDRESS, ROULETTE_ABI, signer);

        contract.on("rouletteSpun", (player, payout, numberRolled) => {
            const valueInWei = parseFloat(ethers.utils.formatEther(payout)) * (10**18);
            dispatch(handleRollEvent({address:player, amount:valueInWei, number:numberRolled}));
            console.log("listener:", player, valueInWei, numberRolled);
        })
    }

    return
}