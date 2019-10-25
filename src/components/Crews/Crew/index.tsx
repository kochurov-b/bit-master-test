import React from "react";

import "./styles.css";

interface IPropsCrew {
  mark: string;
  model: string;
  color: string;
  distance: number;
  className: string;
}

export default ({ mark, model, color, distance, className }: IPropsCrew) => (
  <div className={`crew ${className && className}`}>
    <div className="crew__info">
      <h4 className="crew__title">
        {mark} {model}
      </h4>
      <span>{color}</span>
    </div>
    <span className="crew__distance">{distance} м</span>
  </div>
);
