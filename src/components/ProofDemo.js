import React from "react";
import useProofDemo from "./useProofDemo";
import ProofDemoUI from "./ProofDemoUI";

export default function ProofDemo() {
  const proofDemo = useProofDemo();

  return <ProofDemoUI {...proofDemo} />;
}
