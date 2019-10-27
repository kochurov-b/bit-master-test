import React, { useState, useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Suggestions from "./Suggestions";
import { setLocation, updateAddress } from "../../store/actions/location";
import { StoreType } from "../../store";
import { config } from "../../config";
import { addresses } from "../../streets.json";

import "./styles.css";

export default () => {
  const address = useSelector<StoreType, string>(
    state => state.location.address
  );
  const [inputValue, setInputValue] = useState<string>(address);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>(
    []
  );
  const dispatch = useDispatch();
  useEffect(() => setInputValue(address), [address]);

  interface ISuggestion {
    address: string;
    lat: number;
    lon: number;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // в идеале сделать через saga debounce, а лучше без redux, использовать rxjs

    const value = event.currentTarget.value.trim();
    value && dispatch(updateAddress(value));

    const filteredSuggestions: Array<string> = addresses
      .map((suggestion: ISuggestion) => suggestion.address)
      .filter(item => item.toLowerCase().indexOf(value.toLowerCase()) > -1);

    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setInputValue(value);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    dispatch(setLocation(`${config.locationCity} ${value}`));
    dispatch(updateAddress(value));
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setInputValue(value);
  };

  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      if (filteredSuggestions.length) {
        setInputValue(filteredSuggestions[activeSuggestion]);
        dispatch(
          setLocation(
            `${config.locationCity} ${filteredSuggestions[activeSuggestion]}`
          )
        );
        dispatch(updateAddress(filteredSuggestions[activeSuggestion]));
      }
    } else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (event.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
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
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      </div>
      {showSuggestions && inputValue && (
        <Suggestions
          activeSuggestion={activeSuggestion}
          filteredSuggestions={filteredSuggestions}
          onClick={(event: MouseEvent<HTMLElement>) => handleClick(event)}
        />
      )}
    </div>
  );
};
