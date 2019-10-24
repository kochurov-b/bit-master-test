import { Reducer } from "redux";

import { IYMapsState, YMapsActions } from "../../types/YMaps";
import { yMapsConstants } from "../constants/ymaps";

export const ymaps: Reducer<IYMapsState, YMapsActions> = (
  state = { current_address: "" },
  action
) => {
  switch (action.type) {
    case yMapsConstants.SET_SELECTED_ADDRESS:
      return {
        ...state,
        current_address: action.payload
      };

    default:
      return { ...state };
  }
};
