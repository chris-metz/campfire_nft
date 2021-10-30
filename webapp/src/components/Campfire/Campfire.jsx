import React from "react";
import styled from "styled-components";
import campfireGif from "../../assets/campfire.gif";

const Container = styled.div`
  text-align: center;
`;

const Campfire = () => {
  return (
    <Container>
      <img width="300" height="300" src={campfireGif} alt="campfire" />
    </Container>
  );
};

export default Campfire;
