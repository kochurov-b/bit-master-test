import { MouseEvent } from "react";

export interface IPropsSuggestions {
  activeSuggestion: number;
  filteredSuggestions: Array<string>;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}
