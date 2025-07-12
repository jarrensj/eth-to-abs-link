'use client'

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false)
  const { isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {isClient && 
        <>
          <ConnectKitButton />
          { isConnecting && <p className="text-sm text-gray-600">connecting...</p> }
          { isDisconnected && <p className="text-sm text-gray-600">no wallet connected</p> }
        </>
      }
    </div>
  )
};

export default ConnectWallet