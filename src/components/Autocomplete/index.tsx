import React, { useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";

import Suggestions from "./Suggestions";
import { setLocation } from "../../store/actions/location";

import "./styles.css";

export default () => {
  const suggestions: Array<string> = [
    "улица 10 лет Октября, 17А",
    "улица Кирова, 115"
  ];

  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>(
    []
  );
  const dispatch = useDispatch();

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
    const value = event.currentTarget.innerText;
    dispatch(
      setLocation({
        coords: `Россия, Россия, Удмуртская Республика, Ижевск, Россия, Россия, Удмуртская Республика, Ижевск, улица 10 лет Октября, 17А`
      })
    );
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setInputValue(value);
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
