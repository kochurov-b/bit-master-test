import { Reducer } from "redux";

import { ILocationState, ELocationTypes } from "../../types/store/location";

export const location: Reducer<ILocationState> = (
  state = { coords: [], address: "" },
  action
) => {
  switch (action.type) {
    case ELocationTypes.SET_LOCATION:
      return {
        ...state,
        coords: action.payload
      };

    case ELocationTypes.UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    default:
      return state;
  }
};
