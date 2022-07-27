import React from "react";
import { useUserContext } from "../../../provider/ContextProvider";

export default function PeachCoin() {
  const {authenticatedUser} = useUserContext();

  return (
    <div className="d-flex gap-1">
      <div>
        <img className="peach-coin-logo" src={require("../../../assets/img/peach_coin_logo.png")} alt="Peach Coin Logo" />
      </div>

      <div className="d-flex justify-content-center align-items-center gap-0 flex-column fw-bold">
        <div className="lh-sm">{!authenticatedUser ? "Fetching Data..." : authenticatedUser.peach_coin}</div>
        <div className="lh-sm">Peach Coin</div>
      </div>
    </div>
  );
}
