import React from "react";

import "../../styles/SleepingCat.scss";

function SleepingCat() {
  return (
    <div className="main z-10 absolute bottom-28 right-0">
      <div className="cat">
        <div className="body" />
        <div className="head">
          <div className="ear" />
          <div className="ear" />
        </div>
        <div className="face">
          <div className="nose" />
          <div className="whisker-container">
            <div className="whisker" />
            <div className="whisker" />
          </div>
          <div className="whisker-container">
            <div className="whisker" />
            <div className="whisker" />
          </div>
        </div>
        <div className="tail-container">
          <div className="tail">
            <div className="tail">
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SleepingCat;
