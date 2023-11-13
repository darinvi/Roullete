import {init} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import CombinedBoard from '../board/CombinedBoard'
import SpinButton from '../SpinButton'
import DisplayBets from '../displayBets/DisplayBets'
import ConnectComponent from './ConnectComponent'
import { useEffect } from 'react'
import EventListener from './EventListener'

const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/EB_Y3YZKU0iLP46kusxjohflv9CKjsbH"

const injected = injectedModule();

init({
    connect:{
        autoConnectLastWallet: true
    },
    wallets:[injected],
    chains: [{
        id:"0xaa36a7",
        token: "ETH",
        label: "Ethereum Sepolia",
        rpcUrl,
    }]
})

export default function ConnectMetamask(){
    useEffect(()=>{
        if (!window.ethereum) {
            alert("install MetaMask");
        }
    },[])

    return (
        <div className="flex flex-col gap-2 bg-green-100 h-[100vh]">
            <ConnectComponent />
            <EventListener />
            <div className="flex">
                <div className="flex gap-8 p-4 mx-auto mt-10">
                    <div className="flex flex-col gap-16">
                        <CombinedBoard />
                        <SpinButton />
                    </div>
                    <DisplayBets />
                </div>
            </div>
        </div>
    )
}


