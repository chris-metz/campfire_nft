import React from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import AuthButton from "../AuthButton/AuthButton";

function genShortedAddress(fullAddr) {
  const begin = fullAddr.substr(0, 5);
  const end = fullAddr.substr(fullAddr.length - 5, 5);
  const shorted = `${begin}...${end}`;
  return shorted;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  justify-content: space-between;
`;

const LoggedInMessage = () => {
  const { account } = useWeb3React();

  const shortedAddr = genShortedAddress(account);

  return (
    <Container>
      Connected with {shortedAddr}
      <AuthButton />
    </Container>
  );
};

export default LoggedInMessage;
