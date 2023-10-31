import {useConnectWallet} from '@web3-onboard/react'


export default function ConnectComponent() {
    const [{wallet, connecting}, connect, disconnect] = useConnectWallet();

    return (
        <div className="flex flex-col mx-auto items-center">
            <button
                className="bg-orange-200 w-fit mt-2 rounded px-4 py-1 border border-orange-500 transform hover:scale-105 hover:bg-orange-300"
                disabled={connecting}
                onClick={() => { wallet ? disconnect(wallet) : connect() }}
            >
                {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
            </button>
            <p className='text-xs text-center'>*make sure you are connected to Sepolia Test Net*</p>
        </div>
    )
}