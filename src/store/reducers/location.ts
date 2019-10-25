import { Reducer } from "redux";

import { ILocationState, ELocationTypes } from "../../types/store/location";

export const location: Reducer<ILocationState> = (
  state = { coords: [], notFound: false },
  action
) => {
  switch (action.type) {
    case ELocationTypes.SET_LOCATION:
      const { coords, notFound } = action.payload;

      return {
        ...state,
        coords,
        notFound
      };

    default:
      return state;
  }
};
