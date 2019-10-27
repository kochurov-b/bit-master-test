import { MouseEvent } from "react";

export interface IPropsSuggestions {
  filteredSuggestions: Array<string>;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}
