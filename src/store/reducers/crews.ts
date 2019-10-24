import { Reducer } from "redux";

import { ECrewsTypes, ICrewsState } from "../types/crews";

export const crews: Reducer<ICrewsState> = (
  state = { loading: false, error: "", data: [] },
  action
) => {
  switch (action.type) {
    case ECrewsTypes.GET_CREWS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ECrewsTypes.GET_CREWS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    case ECrewsTypes.GET_CREWS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
};
