'use client'

import { useSignMessage } from "wagmi";
import { useState } from "react";

interface WalletVerificationProps {
  connectedAddress: string;
}

const WalletVerification = ({ connectedAddress }: WalletVerificationProps) => {
  const [abstractAddress, setAbstractAddress] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  
  const { signMessage, isPending: isSigningPending, error: signError } = useSignMessage({
    mutation: {
      onSuccess: (signature) => {
        console.log('Signature:', signature)
        setVerificationComplete(true)
        setIsVerifying(false)
        // TODO
        handleFormSubmission(signature)
      },
      onError: (error) => {
        console.error('Signing failed:', error)
        setIsVerifying(false)
      }
    }
  })

  const handleVerifyOwnership = async () => {
    if (!abstractAddress.trim()) {
      alert('Please enter your abstract wallet address')
      return
    }
    
    setIsVerifying(true)
    
    // Create a message to sign for verification
    const message = `Verify ownership of abstract wallet: ${abstractAddress}\nConnected wallet: ${connectedAddress}\nTimestamp: ${Date.now()}`
    
    try {
      await signMessage({ message })
    } catch (error) {
      console.error('Failed to sign message:', error)
      setIsVerifying(false)
    }
  }

  const handleFormSubmission = async (signature: string) => {
    // This is where you would submit the form data to your backend
    const formData = {
      connectedWallet: connectedAddress,
      abstractWallet: abstractAddress,
      signature: signature,
      timestamp: Date.now()
    }
    
    console.log('Form data to submit:', formData)
    
    // Example API call (replace with your actual endpoint)
    // try {
    //   const response = await fetch('/api/verify-wallet', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   })
    //   const result = await response.json()
    //   console.log('Verification result:', result)
    // } catch (error) {
    //   console.error('Form submission failed:', error)
    // }
  }

  const resetForm = () => {
    setAbstractAddress('')
    setVerificationComplete(false)
    setIsVerifying(false)
  }

  return (
    <div className="w-full space-y-4 p-6 border rounded-lg bg-gray-50">
      <div className="text-sm text-green-600 mb-4">
        ✅ Wallet connected: {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
      </div>
      
      {!verificationComplete ? (
        <>
          <div className="space-y-2">
            <label htmlFor="abstractAddress" className="block text-sm font-medium text-gray-700">
              Abstract Wallet Address
            </label>
            <input
              id="abstractAddress"
              type="text"
              value={abstractAddress}
              onChange={(e) => setAbstractAddress(e.target.value)}
              placeholder="Paste your abstract wallet address here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isVerifying || isSigningPending}
            />
          </div>
          
          <button
            onClick={handleVerifyOwnership}
            disabled={isVerifying || isSigningPending || !abstractAddress.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isVerifying || isSigningPending ? 'Verifying...' : 'Verify Ownership & Submit'}
          </button>
          
          {signError && (
            <p className="text-sm text-red-600">
              Error: {signError.message}
            </p>
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-green-600">
            ✅ Verification complete! Form submitted successfully.
          </div>
          <button
            onClick={resetForm}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Submit another verification
          </button>
        </div>
      )}
    </div>
  )
};

export default WalletVerification 