import React from "react";
import Modal from "react-modal";
import { useAdapter } from "Hooks/useAdapter";
import { Close } from "@material-ui/icons";

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
            <li onClick={onConnectClick}>MetaMask</li>
            <li onClick={onConnectClick}>MathWallet</li>
            <li onClick={onConnectClick}>TrustWallet</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
