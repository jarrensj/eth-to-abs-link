'use client'

import { useSignMessage } from "wagmi";
import { useState } from "react";

interface WalletVerificationProps {
  connectedAddress: string;
}

const WalletVerification = ({ connectedAddress }: WalletVerificationProps) => {
  const [abstractAddress, setAbstractAddress] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { signMessage, isPending: isSigningPending, error: signError } = useSignMessage({
    mutation: {
      onSuccess: (signature) => {
        handleFormSubmission(signature)
      },
      onError: (error) => {
        console.error('Signing failed:', error)
        setIsVerifying(false)
        setError('Failed to sign message')
      }
    }
  })

  const handleVerifyOwnership = async () => {
    if (!abstractAddress.trim()) {
      setError('Please enter your abstract wallet address')
      return
    }
    
    setIsVerifying(true)
    setError(null)
    
    // Create a message to sign for verification
    const message = `Verify ownership of abstract wallet: ${abstractAddress}\nConnected wallet: ${connectedAddress}\nTimestamp: ${Date.now()}`
    
    try {
      await signMessage({ message })
    } catch (error) {
      console.error('Failed to sign message:', error)
      setIsVerifying(false)
      setError('Failed to sign message')
    }
  }

  const handleFormSubmission = async (signature: string) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          connectedWallet: connectedAddress,
          abstractWallet: abstractAddress,
          signature: signature
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setVerificationComplete(true);
    } catch (error) {
      console.error('Form submission failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit verification');
      setVerificationComplete(false);
    } finally {
      setIsVerifying(false);
      setIsSubmitting(false);
    }
  }

  const resetForm = () => {
    setAbstractAddress('')
    setVerificationComplete(false)
    setIsVerifying(false)
    setIsSubmitting(false)
    setError(null)
  }

  // Separate disabled states for input and button
  const isInputDisabled = isVerifying || isSigningPending || isSubmitting
  const isButtonDisabled = isInputDisabled || !abstractAddress.trim()

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
              disabled={isInputDisabled}
            />
          </div>
          
          <button
            onClick={handleVerifyOwnership}
            disabled={isButtonDisabled}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isVerifying || isSigningPending ? 'Verifying...' : 
             isSubmitting ? 'Submitting...' : 'Verify Ownership & Submit'}
          </button>
          
          {(error || signError) && (
            <p className="text-sm text-red-600">
              Error: {error || signError?.message}
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