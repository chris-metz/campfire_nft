import React from "react";
import { GlobalStyle } from "./globalStyles";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import App from "./App";
import "nes.css/css/nes.min.css";

function getLibrary(provider) {
  return new Web3(provider);
}

const AppProvider = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalStyle />
      <App />
    </Web3ReactProvider>
  );
};

export default AppProvider;
