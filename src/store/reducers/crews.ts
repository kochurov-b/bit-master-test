import { Reducer } from "redux";

import { ECrewsTypes, ICrewsState } from "../../types/store/crews";

export const crews: Reducer<ICrewsState> = (
  state = {
    loading: false,
    error: "",
    select_crew: null,
    not_found: false,
    data: []
  },
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
        data: action.payload,
        select_crew: action.payload[0].crew_id,
        not_found: false
      };
    }

    case ECrewsTypes.GET_CREWS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case ECrewsTypes.SELECT_CREW: {
      return {
        ...state,
        select_crew: action.payload
      };
    }

    case ECrewsTypes.CLEAR_CREWS: {
      return {
        ...state,
        select_crew: null,
        not_found: true,
        data: []
      };
    }

    default:
      return state;
  }
};
