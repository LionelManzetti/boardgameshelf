import React from "react";

import "../../styles/Furnitures.scss";

function Sofa() {
  return (
    <div className="sofaContainer">
      <div className="sofa shadow-lg">
        <div className="sofaBottomPart" />
        <div className="sofaArmrest" />
        <div className="sofaArmrest" />
        <div className="sofaLeg" />
        <div className="sofaLeg sofaRightLeg" />
        <div className="sofaGlare" />
      </div>
      <div className="bricks bricks2" />
      <div className="bricks bricks1" />
    </div>
  );
}

export default Sofa;
