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
    <div className="flex flex-col items-center justify-center space-y-4 mb-10 max-w-md mx-auto">
      {isClient && 
        <>
          <ConnectKitButton />
          
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