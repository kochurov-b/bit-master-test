import { Reducer } from "redux";

import { ILocationState, ELocationTypes } from "../../types/store/location";

export const location: Reducer<ILocationState> = (
  state = { coords: [], address: "" },
  action
) => {
  switch (action.type) {
    case ELocationTypes.SET_LOCATION:
      const { coords, address } = action.payload;
      return {
        ...state,
        coords,
        address
      };

    default:
      return state;
  }
};
