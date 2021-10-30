import Web3 from 'web3';
import contractAbi from './contractAbi.js';

const web3 = new Web3(process.env.RPC_WS_URL);

export const contract = new web3.eth.Contract(
  contractAbi,
  process.env.CONTRACT_ADDRESS
);

export default web3;
