import { useState } from "react";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuits/ageVerification.json";

export default function useProofDemo() {
  const [step, setStep] = useState(0);
  const [privateValue, setPrivateValue] = useState("");
  const [publicValue, setPublicValue] = useState("");
  const [proof, setProof] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const initializeCircuit = async () => {
    const noir = new Noir(circuit);
    const backend = new UltraHonkBackend(circuit.bytecode);
    return { noir, backend };
  };

  const generateProof = async () => {
    if (!privateValue || !publicValue) {
      alert("Pass the values ");
      return;
    }
    const age = Number(privateValue);
    const minimumAge = Number(publicValue);
    if (age < 0 || minimumAge < 0) {
      alert("Not valid integers ");
      return;
    }

    setIsGenerating(true);
    try {
      const { noir, backend } = await initializeCircuit();
      const input = { age, minimum_age: minimumAge };
      const { witness } = await noir.execute(input);
      const generatedProof = await backend.generateProof(witness);
      const proofData = {
        proof: generatedProof,
        publicInputs: [minimumAge],
        time: Date.now(),
      };
      setProof(proofData);
      setStep(1);
    } catch (error) {
      console.error("Error generating proof:", error);
      alert("something goes wrong " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const verifyProof = async () => {
    if (!proof) {
      alert("No proofs ");
      return;
    }
    setIsVerifying(true);
    try {
      const { backend } = await initializeCircuit();
      const isValid = await backend.verifyProof(proof.proof);
      setVerificationResult(isValid);
      setStep(2);
    } catch (error) {
      console.error("not valid ", error);
      alert("not valid " + error);
    } finally {
      setIsVerifying(false);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setPrivateValue("");
    setPublicValue("");
    setProof(null);
    setVerificationResult(null);
  };

  return {
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
  };
}
