import React from "react";

import { IPropsSuggestions } from "../../../types/suggestions";

import "./styles.css";

export default ({
  inputValue,
  showSuggestions,
  filteredSuggestions,
  onClick
}: IPropsSuggestions) =>
  showSuggestions &&
  inputValue && (
    <div className="suggestions">
      {filteredSuggestions.length ? (
        <ul className="suggestions__list">
          {filteredSuggestions.map((suggestion: string) => (
            <li
              key={suggestion}
              className="suggestions__item"
              onClick={onClick}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <div className="suggestions__empty">
          <strong>No suggestions</strong>
        </div>
      )}
    </div>
  );
