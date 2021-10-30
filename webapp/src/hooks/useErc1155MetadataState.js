import { useEffect, useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { createContract } from "../lib/createContract";

export function useErc1155MetadataState(tokenId) {
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  const { library } = useWeb3React();

  useEffect(() => {
    async function run() {
      const contract = createContract(library);
      try {
        const uri = await contract.methods.uri(0).call();
        const tokenFilled = tokenId.toString().padStart(64, "0");
        const uriFilled = uri.replace("{id}", tokenFilled);
        const res = await axios.get(uriFilled);
        setMetadata(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    run();
  }, [tokenId, library]);

  return { metadata, loading };
}
