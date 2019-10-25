import React, { useState, MouseEvent } from "react";

import Suggestions from "./Suggestions";

import "./styles.css";

export default () => {
  const suggestions: Array<string> = ["Октяб", "Дыр"];

  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>(
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    const filteredSuggestions: Array<string> = suggestions.filter(
      (suggestion: string) =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setInputValue(value);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setInputValue(event.currentTarget.innerText);
  };

  return (
    <div className="autocomplete">
      <div className="autocomplete__field">
        <label className="autocomplete__label" htmlFor="autocomplete__input">
          Откуда
        </label>
        <input
          id="autocomplete__input"
          type="search"
          className="autocomplete__input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          value={inputValue}
        />
      </div>

      <Suggestions
        inputValue={inputValue}
        showSuggestions={showSuggestions}
        filteredSuggestions={filteredSuggestions}
        onClick={(event: MouseEvent<HTMLElement>) => handleClick(event)}
      />
    </div>
  );
};
