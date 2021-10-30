import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 3rem;
`;

const Header = () => {
  return (
    <Container>
      <Heading>Campfire NFT</Heading>
    </Container>
  );
};

export default Header;
