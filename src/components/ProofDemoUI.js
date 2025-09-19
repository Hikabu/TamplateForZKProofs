import React from "react";

export default function ProofDemoUI(props) {
  const {
    step,
    privateValue,
    setPrivateValue,
    publicValue,
    setPublicValue,
    proof,
    isGenerating,
    isVerifying,
    verificationResult,
    generateProof,
    verifyProof,
    resetDemo,
  } = props;

  return (
    <div className="flex flex-col items-center w-full text-left">
      <p className="text-gray-200 mb-6 text-center">
        This demo shows age verification using a Noir zero-knowledge circuit.
        The circuit proves that your private age is greater than or equal to the
        minimum required age,
        <b> without revealing your actual age</b>.
      </p>

      {/* Private Value */}
      <div className="mb-4 w-full">
        <label className="block text-gray-100 font-medium mb-2">
          Your Age (private)
        </label>
        <input
          type="number"
          value={privateValue}
          onChange={(e) => setPrivateValue(parseInt(e.target.value) || 0)}
          placeholder="Enter your age"
          className="w-full p-2 rounded-lg text-black"
          disabled={step > 0}
        />
        <p className="text-sm text-gray-400 mt-1">
          Your actual age will be kept private in the proof
        </p>
      </div>

      {/* Public Value */}
      <div className="mb-6 w-full">
        <label className="block text-gray-100 font-medium mb-2">
          Minimum Required Age (public)
        </label>
        <input
          type="number"
          value={publicValue}
          onChange={(e) => setPublicValue(parseInt(e.target.value) || 0)}
          placeholder="Enter minimum age (e.g., 18)"
          className="w-full p-2 rounded-lg text-black"
          disabled={step > 0}
        />
        <p className="text-sm text-gray-400 mt-1">
          This minimum age requirement will be visible in the proof
        </p>
      </div>

      {/* Status Messages */}
      {step >= 1 && proof && (
        <div className="mb-4 p-3 bg-blue-900/50 rounded-lg w-full">
          <h4 className="text-blue-200 font-medium">✓ Proof Generated Successfully!</h4>
          <p className="text-blue-100 text-sm">
            Public minimum age: {proof.publicInputs[0]}
          </p>
        </div>
      )}

      {step >= 2 && verificationResult !== null && (
        <div
          className={`mb-4 p-3 rounded-lg w-full ${
            verificationResult ? "bg-green-900/50" : "bg-red-900/50"
          }`}
        >
          <h4
            className={`font-medium ${
              verificationResult ? "text-green-200" : "text-red-200"
            }`}
          >
            Verification: {verificationResult ? "✓ Valid Proof" : "✗ Invalid Proof"}
          </h4>
          <p
            className={`text-sm ${
              verificationResult ? "text-green-100" : "text-red-100"
            }`}
          >
            {verificationResult
              ? `Age verification successful! You are ${
                  parseInt(privateValue) >= parseInt(publicValue)
                    ? "eligible"
                    : "not eligible"
                } (minimum: ${publicValue})`
              : "Age verification failed"}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col space-y-4 w-full">
        <button
          onClick={generateProof}
          disabled={isGenerating || step >= 1}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            step >= 1
              ? "bg-purple-600 text-white cursor-not-allowed"
              : isGenerating
              ? "bg-purple-400 text-white cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          {isGenerating ? "Generating Proof..." : "Generate ZK Proof"}
        </button>

        {step >= 1 && (
          <button
            onClick={verifyProof}
            disabled={isVerifying || step >= 2}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              step >= 2
                ? "bg-green-600 text-white cursor-not-allowed"
                : isVerifying
                ? "bg-green-400 text-white cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isVerifying ? "Verifying Proof..." : "Verify Proof"}
          </button>
        )}

        {step >= 2 && (
          <button
            onClick={resetDemo}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-500 transition"
          >
            Reset Demo
          </button>
        )}
      </div>
    </div>
  );
}
