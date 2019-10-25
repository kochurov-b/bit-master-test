import { MouseEvent } from "react";

export interface IPropsSuggestions {
  inputValue: any;
  showSuggestions: boolean;
  filteredSuggestions: Array<string>;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}
