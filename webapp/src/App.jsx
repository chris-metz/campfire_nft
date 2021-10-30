import React, { useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import Header from "./components/Header/Header";
import AuthButton from "./components/AuthButton/AuthButton";
import LoggedInMessage from "./components/LoggedInMessage/LoggedInMessage";
import Branches from "./components/Branches/Branches";
import Campfire from "./components/Campfire/Campfire";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

function App() {
  const { active } = useWeb3React();
  const [fireWasLit, setFireWasLit] = useState(false);

  return (
    <Container>
      <Header />

      {active ? (
        <div>
          <LoggedInMessage />
          <Row>
            <Branches setFireWasLit={setFireWasLit} />
            {fireWasLit && <Campfire />}
          </Row>
        </div>
      ) : (
        <InactiveMessage />
      )}
    </Container>
  );
}

const InactiveMessageContainer = styled.div`
  text-align: center;
`;

const InactiveMessage = () => (
  <InactiveMessageContainer>
    <div>
      Welcome to Campfire NFT, a small demo game to showcase NFT (ERC-1155)
      minting and burning.
    </div>
    <div>
      In order to play, please connect your Wallet and point it to the polygon
      test Network!
    </div>
    <br />

    <AuthButton />
  </InactiveMessageContainer>
);

export default App;
