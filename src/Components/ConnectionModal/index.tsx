import React from "react";
import Modal from "react-modal";
import { useAdapter } from "Hooks/useAdapter";
import { Close } from "@material-ui/icons";
import MetaMask from "Assets/Wallet/metamask.png";
import TrustWallet from "Assets/Wallet/trustwallet.png";
import MathWallet from "Assets/Wallet/mathwallet.png";

import "./ConnectionModal.scss";

export const ConnectionModal: React.FC<{
  isOpen: boolean;
  close: () => void;
}> = ({ isOpen, close }) => {
  const { connect } = useAdapter();

  const onConnectClick = () => {
    connect();
    close();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="ConnectionModal">
        <div className="ConnectionModal__header">
          <span>Connect to wallet</span>
          <span className="ConnectionModal__header__close" onClick={close}>
            <Close />
          </span>
        </div>

        <div className="ConnectionModal__body">
          <ul>
            <li onClick={onConnectClick}>
              <span>MetaMask</span>
              <span className="wallet-icon">
                <img src={MetaMask} alt="metamask" />
              </span>
            </li>
            <li onClick={onConnectClick}>
              <span>MathWallet</span>
              <span className="wallet-icon">
                <img src={MathWallet} alt="mathwallet" />
              </span>
            </li>
            <li onClick={onConnectClick}>
              <span>TrustWallet</span>
              <span className="wallet-icon">
                <img src={TrustWallet} alt="trustwallet" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
