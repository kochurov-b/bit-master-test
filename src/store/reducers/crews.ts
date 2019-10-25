import { Reducer } from "redux";

import { ECrewsTypes, ICrewsState } from "../../types/store/crews";

export const crews: Reducer<ICrewsState> = (
  state = { loading: false, error: "", select_crew: null, data: [] },
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
        select_crew: action.payload[0].crew_id
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

    default:
      return state;
  }
};
