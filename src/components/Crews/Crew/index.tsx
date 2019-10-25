import React from "react";

import { IPropsCrew } from "../../../types/crews";

import "./styles.css";

export default ({
  mark,
  model,
  color,
  distance,
  className,
  tabIndex,
  onClick
}: IPropsCrew) => (
  <div
    tabIndex={tabIndex}
    className={`crew ${className && className}`}
    onClick={onClick}
  >
    <div className="crew__info">
      <h4 className="crew__title">
        {mark} {model}
      </h4>
      <span>{color}</span>
    </div>
    <span className="crew__distance">{distance} м</span>
  </div>
);
