import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Adapter } from "../../Store/Adapter";
import { Balances } from "../../Store/Balance";
import { ConnectedModal } from "../ConnectedModal";
import { ConnectionModal } from "../ConnectionModal";
import { ReactComponent as UnifiLogo } from "Assets/Unifi.svg";

import "./Header.scss";
import { Config } from "../../Config";

export const Header: React.FC = ({ children }) => {
  const adapter = useRecoilValue(Adapter);
  const balance = useRecoilValue(Balances);
  const [connectionModal, setConnectionModal] = useState(false);

  return (
    <div className="Header">
      <div className="Header__info">
        <span className="Header__info__logo">
          <UnifiLogo />
        </span>

        <span className="Header__info__right-menu">
          {adapter && (
            <>
              <span>{balance["BNB"]} BNB</span>
              <span>{balance[Config.contracts.UNFI.address]} UNFI</span>
            </>
          )}
          <span
            className="Header__info__right-menu__address"
            onClick={() => setConnectionModal(true)}
          >
            {adapter ? adapter.getAddress() : "Connect a Wallet"}
          </span>
          <a
            className="Header__info__right-menu__utrade"
            href="https://binance.unifiprotocol.com/"
          >
            Back to uTrade
          </a>
        </span>

        <ConnectionModal
          isOpen={!adapter && connectionModal}
          close={() => setConnectionModal(false)}
        />
        <ConnectedModal
          isOpen={adapter !== undefined && connectionModal}
          close={() => setConnectionModal(false)}
        />
      </div>
      <div className="Header__children">{children}</div>
    </div>
  );
};
