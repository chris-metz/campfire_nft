import contractAbi from "./contractAbi.json";

export function createContract(library) {
  const contract = new library.eth.Contract(
    contractAbi,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  return contract;
}
