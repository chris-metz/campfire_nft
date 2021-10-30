import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useErc1155MetadataState } from "../../hooks/useErc1155MetadataState";
import { createContract } from "../../lib/createContract";

const Container = styled.div`
  max-width: 330px;
  padding-left: 200px;
  min-height: 410px;
  font-size: 0.7rem;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const Description = styled.div`
  text-align: center;
  color: #adadad;
  margin-bottom: 10px;
`;
const ButtonRow = styled.div`
  margin-top: 10px;
`;

export const Branches = ({ setFireWasLit }) => {
  const {
    mintInProgress,
    burnInProgress,
    handleMint,
    handleBurn,
    loading,
    metadata,
    numOwnBranches,
    numTotalBranches,
  } = useBranchesState({ setFireWasLit });

  if (loading) {
    return <div>plz wait ...</div>;
  }

  return (
    <Container className="nes-container with-title is-rounded is-dark">
      <p className="title">Branch</p>
      <ImageWrapper>
        <img src={metadata.image} width="200" alt="A branch" />
      </ImageWrapper>
      <Description>{metadata.description}</Description>
      <div>Total: {numTotalBranches}</div>
      <div>Own: {numOwnBranches}</div>

      <ButtonRow>
        <button
          className={
            mintInProgress ? "nes-btn is-disabled" : "nes-btn is-warning"
          }
          onClick={handleMint}
          disabled={mintInProgress}
        >
          {mintInProgress ? "in progress" : "Mint"}
        </button>

        <button
          className={
            burnInProgress ? "nes-btn is-disabled" : "nes-btn is-error"
          }
          onClick={handleBurn}
          disabled={numOwnBranches < 1 || burnInProgress}
        >
          {burnInProgress ? "in progress" : "Burn"}
        </button>
      </ButtonRow>
    </Container>
  );
};

function useBranchesState({ setFireWasLit }) {
  const { account, library } = useWeb3React();
  const [mintInProgress, setMintInProgress] = useState(false);
  const [burnInProgress, setBurnInProgress] = useState(false);
  const [numOwnBranches, setNumOwnBranches] = useState(0);
  const [numTotalBranches, setNumTotalBranches] = useState(0);
  const { metadata, loading } = useErc1155MetadataState(0);
  const contract = createContract(library);

  const getBranchNumbers = useCallback(async () => {
    const numOwn = await contract.methods.balanceOf(account, 0).call();
    setNumOwnBranches(numOwn);
    const numTotal = await contract.methods.totalSupply(0).call();
    setNumTotalBranches(numTotal);
  }, [account, contract.methods]);

  useEffect(() => {
    getBranchNumbers();
  }, [getBranchNumbers]);

  async function handleMint() {
    setMintInProgress(true);
    try {
      const receipt = await contract.methods
        .mintBranch(account)
        .send({ from: account });
      console.log(receipt);
      await sleep(2000);
      await getBranchNumbers();
    } catch (error) {
      console.error(error);
    } finally {
      setMintInProgress(false);
    }
  }

  async function handleBurn() {
    setBurnInProgress(true);
    try {
      const receipt = await contract.methods
        .burn(account, 0, 1)
        .send({ from: account });
      console.log(receipt);
      await sleep(2000);
      await getBranchNumbers();
      setFireWasLit(true);
    } catch (error) {
      console.error(error);
    } finally {
      setBurnInProgress(false);
    }
  }

  return {
    mintInProgress,
    burnInProgress,
    handleMint,
    handleBurn,
    loading,
    metadata,
    numOwnBranches,
    numTotalBranches,
  };
}

async function sleep(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

export default Branches;
