import React, { useMemo } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { Adapter } from "../../Store/Adapter";
import { Config } from "../../Config";
import { Button } from "../Button";
import { Close } from "@material-ui/icons";

import "./ConnectedModal.scss";

export const ConnectedModal: React.FC<{
  isOpen: boolean;
  close: () => void;
}> = ({ isOpen, close }) => {
  const [adapter, setAdapter] = useRecoilState(Adapter);

  const explorerLink = useMemo(() => {
    return adapter
      ? Config.accountExplorer.replace(/{{ADDRESS}}/, adapter.getAddress())
      : "#";
  }, [adapter]);

  const onDisconnectClick = () => {
    setAdapter(undefined);
    close();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="ConnectedModal">
        <div className="ConnectedModal__header">
          <span>Your wallet</span>
          <span className="ConnectionModal__header__close" onClick={close}>
            <Close />
          </span>
        </div>

        <div className="ConnectedModal__body">
          <div className="ConnectedModal__body__address">
            <a href={explorerLink} target="_blank" rel="noopener noreferrer">
              {adapter?.getAddress()}
            </a>
            <div className="ConnectedModal__body__logout">
              <Button onClick={onDisconnectClick}>Disconnect</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
