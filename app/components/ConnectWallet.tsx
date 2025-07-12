'use client'

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import WalletVerification from "./WalletVerification";

const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false)
  const { isConnecting, isDisconnected, isConnected, address } = useAccount();

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
      {isClient && 
        <>
          <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, address, ensName }) => (
              <button
                onClick={show}
                className="w-full py-2 px-4 rounded-md font-bold text-white bg-pink-500 hover:bg-pink-400 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
              >
                {isConnected
                  ? ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : isConnecting
                  ? 'Connecting...'
                  : 'Connect Wallet'}
              </button>
            )}
          </ConnectKitButton.Custom>
          
          {isConnecting && <p className="text-sm text-gray-600">connecting...</p>}
          {isDisconnected && <p className="text-sm text-gray-600">no wallet connected</p>}
          
          {isConnected && address && (
            <WalletVerification connectedAddress={address} />
          )}
        </>
      }
    </div>
  )
};

export default ConnectWallet