import React from "react";

import { IPropsSuggestions } from "../../../types/suggestions";

import "./styles.css";

export default ({ filteredSuggestions, onClick }: IPropsSuggestions) => (
  <div className="suggestions">
    {filteredSuggestions.length ? (
      <ul className="suggestions__list">
        {filteredSuggestions.map((suggestion: string) => (
          <li key={suggestion} className="suggestions__item" onClick={onClick}>
            {suggestion}
          </li>
        ))}
      </ul>
    ) : (
      <div className="suggestions__empty">
        <span>Нет подходящего адреса!</span>
      </div>
    )}
  </div>
);
