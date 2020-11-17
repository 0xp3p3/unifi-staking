import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ReactComponent as UnifiLogo } from "Assets/Unifi.svg";
import { Adapter } from "../../Store/Adapter";
import { ConnectionModal } from "../../Components/ConnectionModal";
import { Balances } from "../../Store/Balance";

import "./HomeHeader.scss";
import { ConnectedModal } from "../../Components/ConnectedModal";

export const HomeHeader = () => {
  const adapter = useRecoilValue(Adapter);
  const balance = useRecoilValue(Balances);
  const [connectionModal, setConnectionModal] = useState(false);

  return (
    <div className="HomeHeader">
      <span className="HomeHeader__logo">
        <UnifiLogo />
      </span>

      <span className="HomeHeader__right-menu">
        {adapter && (
          <>
            <span>{balance["BNB"]} BNB</span>
            <span>{balance["UNFI"]} UNFI</span>
          </>
        )}
        <span
          className="HomeHeader__right-menu__address"
          onClick={() => setConnectionModal(true)}
        >
          {adapter ? adapter.getAddress() : "Connect a Wallet"}
        </span>
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
  );
};
