import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../lib/injectedConnector";

const AuthButton = () => {
  const { active, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injectedConnector);
    } catch (ex) {
      // console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      // console.log(ex);
    }
  }

  if (!active) {
    return (
      <div>
        <button className="nes-btn is-warning" onClick={connect}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <button className="nes-btn is-warning" onClick={disconnect}>
      Logout
    </button>
  );
};

export default AuthButton;
